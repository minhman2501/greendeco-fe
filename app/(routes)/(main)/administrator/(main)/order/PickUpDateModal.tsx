import {
	OrderState,
	ProcessStatusRequest,
	updateOrderProcessStatus,
} from '@/app/_api/axios/admin/order'
import Button from '@/app/_components/Button'
import { TextField } from '@/app/_components/form'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'
import { notifyError } from '../../../(customer)/user/setting/profile/Notification'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { OrderUpdateSchema, OrderUpdateSchemaType } from '@/app/_configs/schemas/order'
import { notifyUpdateCancelSuccess } from './Notification'
import { ORDER_STATE_FIELD } from '@/app/_configs/constants/variables'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'

type PickUpdateModalType = {
	order: OrderState
	onCancel: () => void
	onSuccess: (value: any) => void
}

export default function PickUpDateModal({ order, onSuccess, onCancel }: PickUpdateModalType) {
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)
	const queryClient = useQueryClient()
	const defaultInputValues: OrderUpdateSchemaType = {
		paid_at: '',
	}
	const { register, handleSubmit, reset } = useForm<ProcessStatusRequest>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(OrderUpdateSchema),
		defaultValues: defaultInputValues,
	})

	const updateStatusMutation = useMutation({
		mutationFn: updateOrderProcessStatus,
		onSuccess: () => {
			onSuccess(false)
			notifyUpdateCancelSuccess(order.order_id, ORDER_STATE_FIELD.processing.state)
			queryClient.invalidateQueries({ queryKey: [UseQueryKeys.Order, ADMIN_QUERY_KEY] })
			reset()
		},
		onError: (e) => {
			if (e instanceof AxiosError) {
				notifyError(e.response?.data.msg)
			}
		},
	})

	const handleOnSubmit: SubmitHandler<ProcessStatusRequest> = (values, e) => {
		e?.preventDefault()
		updateStatusMutation.mutate({
			adminAccessToken: adminAccessToken!,
			orderId: order.order_id,
			state: ORDER_STATE_FIELD.processing.state,
			paid_at: new Date(values.paid_at).toISOString(),
			//NOTE: chnage the message and tilte data for processing status
			message: 'Your order is in processing',
			title: 'Your order is in processing',
			userId: order.owner_id,
		})
	}

	return (
		<div className='absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center bg-primary-418/40'>
			<div className='z-10 rounded-3xl border border-order-status-processing bg-neutral-gray-1'>
				<div className='flex h-[79px] flex-col items-center justify-center rounded-t-3xl bg-order-status-processing p-10 text-center text-white'>
					<h1 className='text-2xl uppercase'>Updating to processing</h1>
					<p className='pt-1 text-xl'>
						Enter the customer&apos;s payment date to complete the process
					</p>
				</div>
				<form
					onSubmit={handleSubmit(handleOnSubmit)}
					className='flex flex-col justify-center p-8 text-2xl'
				>
					<TextField
						type='datetime-local'
						label='Date: '
						placeholder=''
						error={false}
						className='m-2.5'
						register={register('paid_at')}
					/>
					<div className='flex justify-end'>
						<Button
							className='m-2.5 w-40 border-0 bg-order-status-processing text-center text-xl'
							type='submit'
						>
							Confirm
						</Button>
						<Button
							className='m-2.5  w-36 border-order-status-processing bg-neutral-gray-1 text-xl text-order-status-processing'
							onClick={onCancel}
						>
							Cancel
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
