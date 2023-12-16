import { OrderState, updateOrderStatus } from '@/app/_api/axios/admin/order'
import { Dropdown } from '@/app/_components/dropdown'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { ORDER_STATE_FIELD } from '@/app/_configs/constants/variables'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'
import { useState, useEffect } from 'react'
import { notifyUpdateCancelSuccess } from './Notification'
import PickUpDateModal from './PickUpDateModal'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { notifyError } from '../../../(customer)/user/setting/profile/Notification'
import CancelModal from './CancelModal'

export default function OrderDropdownState({ order }: { order: OrderState }) {
	const [state, setState] = useState(order.state)
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [pickUpDateModal, setPickUpModal] = useState(false)
	const states = ORDER_STATE_FIELD
	const queryClient = useQueryClient()

	useEffect(() => {
		setState(order.state)
	}, [order.state])

	var stateList: { [key: string]: string[] } = {
		draft: [states.processing.state, states.cancelled.state],
		processing: [states.completed.state, states.cancelled.state],
		completed: [],
		cancelled: [],
	}

	const updateOrderStatusComplete = useMutation({
		mutationFn: updateOrderStatus,
		onSuccess: () => {
			notifyUpdateCancelSuccess(order.order_id, states.completed.state)
			queryClient.invalidateQueries({ queryKey: [UseQueryKeys.Order, ADMIN_QUERY_KEY] })
		},
		onError: (e) => {
			if (e instanceof AxiosError) {
				notifyError(e.response?.data.msg)
			}
		},
	})

	const handleOnSelect = (value: string) => {
		if (value === states.processing.state) {
			// open modal => full fill paid at => update
			setPickUpModal(!pickUpDateModal)
		}

		if (value === states.cancelled.state) {
			// update status => create message => send message to user
			setIsModalOpen(!isModalOpen)
		}

		if (value === states.completed.state) {
			updateOrderStatusComplete.mutate({
				adminAccessToken: adminAccessToken!,
				orderId: order.order_id,
				state: states.completed.state,
			})
		}
	}

	const baseInputStyle = 'border-0 w-full text-white capitalize text-base '
	return (
		<>
			<Dropdown
				data={stateList[state]}
				value={state}
				onSelect={handleOnSelect}
				inputStyle={
					state === states.draft.state
						? baseInputStyle + 'bg-order-status-draft'
						: state === states.processing.state
						? baseInputStyle + 'bg-order-status-processing'
						: state === states.completed.state
						? baseInputStyle + 'bg-order-status-completed'
						: baseInputStyle + 'bg-order-status-cancelled'
				}
				dropdownContainerStyle={'bg-white'}
			/>
			{!isModalOpen || (
				<CancelModal
					order={order}
					onSuccess={setIsModalOpen}
					onCancel={() => setIsModalOpen(false)}
				/>
			)}
			{!pickUpDateModal || (
				<PickUpDateModal
					order={order}
					onCancel={() => setPickUpModal(false)}
					onSuccess={setPickUpModal}
				/>
			)}
		</>
	)
}
