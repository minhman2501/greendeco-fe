import {
	OrderTableData,
	OrderState,
	updateOrderCancelStatus,
	CancelStatusRequest,
	updateOrderStatus,
} from '@/app/_api/axios/admin/order'
import { Dropdown } from '@/app/_components/dropdown'
import { ORDER_STATE_FIELD } from '@/app/_configs/constants/variables'
import formatDate from '@/app/_hooks/useFormatDate'
import {
	createColumnHelper,
	useReactTable,
	getCoreRowModel,
	flexRender,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import CancelModal from './CancelModal'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	CreateNotificationInputType,
	CreateNotificationSchema,
} from '@/app/_configs/schemas/notification'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { notifyUpdateCancelSuccess } from './Notification'
import Link from 'next/link'
import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'
import { AxiosError } from 'axios'
import { notifyError } from '../../../(customer)/user/setting/profile/Notification'
import PickUpDateModal from './PickUpDateModal'

const columHelper = createColumnHelper<OrderTableData>()

const columns = [
	columHelper.accessor('owner_info', {
		cell: (info) => (
			<span className='flex w-full items-center justify-center'>
				<div>
					<Link href={`${ADMINISTRATOR_ROUTE.ORDER.LINK}/${info.getValue().order_id!}`}>
						{info.getValue().order_id}
					</Link>
					<p>
						{info.getValue().user_name}({info.getValue().userPhoneNumber})
					</p>
				</div>
			</span>
		),
		header: () => <span>Order Detail</span>,
	}),

	columHelper.accessor('OrderData', {
		cell: (info) => (
			<span className='inline-block w-full text-center'>
				{info.getValue().shipping_address}
			</span>
		),
		header: () => <span>Shipping Address</span>,
	}),

	columHelper.accessor('OrderPrice.total', {
		cell: (info) => <span className='inline-block w-full text-center'>{info.getValue()}</span>,
		header: () => <span>Price</span>,
	}),

	columHelper.accessor('OrderData.created_at', {
		cell: (info) => (
			<span className='inline-block w-full text-center'>
				{formatDate(new Date(info.getValue()))}
			</span>
		),
		header: () => <span>Date Created</span>,
	}),

	columHelper.accessor('order_state', {
		id: 'Action',
		cell: (info) => {
			return <ActionWrapper order={info.getValue()} />
		},
		header: () => <span>Actions</span>,
	}),
]

const ActionWrapper = ({ order }: { order: OrderState }) => {
	const [state, setState] = useState(order.state)
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()

	useEffect(() => {
		setState(order.state)
	}, [order.state])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [pickUpDateModal, setPickUpModal] = useState(false)
	const states = ORDER_STATE_FIELD
	const queryClient = useQueryClient()

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
			queryClient.invalidateQueries({ queryKey: ['order'] })
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
		<div className='flex min-w-[150px] items-center justify-center'>
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
					onSuccess={() => setIsModalOpen(false)}
					onCancel={() => setIsModalOpen(false)}
				/>
			)}
			{!pickUpDateModal || (
				<PickUpDateModal
					order={order}
					onCancel={() => setPickUpModal(false)}
					onSuccess={() => setPickUpModal(false)}
				/>
			)}
		</div>
	)
}

export default function OrderTable({ order }: { order: OrderTableData[] }) {
	const table = useReactTable({
		data: order,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className='w-full overflow-hidden border-[1px] border-primary-625-40 '>
			<div className='w-full border-b-[1px] border-primary-625-60 p-3 text-2xl text-primary-418-60 '>
				{order.length} Order(s) in queue
			</div>
			<table className='w-full'>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr
							className='border-b-[1px] border-primary-625-80'
							key={headerGroup.id}
						>
							{headerGroup.headers.map((header) => (
								<th
									className='border-r-[1px] border-primary-625 bg-primary-5555-20 p-compact text-body-sm text-primary-625 last:border-0'
									key={header.id}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr
							className='border-b-[1px] border-primary-625 last:border-0 hover:bg-primary-5555-20/50'
							key={row.id}
						>
							{row.getVisibleCells().map((cell) => (
								<td
									className='border-r-[1px] border-primary-625 p-compact text-body-sm last:border-0'
									key={cell.id}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.footer,
												header.getContext(),
										  )}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
		</div>
	)
}
