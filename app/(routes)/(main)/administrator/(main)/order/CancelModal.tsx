import {
	CancelStatusRequest,
	OrderState,
	updateOrderCancelStatus,
} from '@/app/_api/axios/admin/order'
import Button from '@/app/_components/Button'
import { MultilineTextField } from '@/app/_components/form'
import {
	CreateNotificationInputType,
	CreateNotificationSchema,
} from '@/app/_configs/schemas/notification'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { notifyUpdateCancelSuccess } from './Notification'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { notifyError } from '../../../(customer)/user/setting/profile/Notification'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { getCookie } from 'cookies-next'
import { ORDER_STATE_FIELD } from '@/app/_configs/constants/variables'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'

type CancelModalType = {
	order: OrderState
	onCancel: () => void
	onSuccess: Function
}

export default function CancelModal({ order, onCancel, onSuccess }: CancelModalType) {
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
	const queryClient = useQueryClient()
	const defaultInputValues: CreateNotificationInputType = {
		// Change the title for notification
		title: 'Cancel Order ' + order.order_id,
		message: '',
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CancelStatusRequest>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(CreateNotificationSchema),
		defaultValues: defaultInputValues,
	})

	const updateCancelStatusMutation = useMutation({
		mutationFn: updateOrderCancelStatus,
		onSuccess: () => {
			notifyUpdateCancelSuccess(order.order_id, ORDER_STATE_FIELD.cancelled.state)
			queryClient.invalidateQueries({ queryKey: [UseQueryKeys.Order, ADMIN_QUERY_KEY] })
			onSuccess(false)
		},
		onError: (e) => {
			if (e instanceof AxiosError) {
				notifyError(e.response?.data.msg)
			}
		},
	})

	const handleOnSubmitCancel: SubmitHandler<CancelStatusRequest> = (values, e) => {
		e?.preventDefault()
		updateCancelStatusMutation.mutate({
			adminAccessToken: adminAccessToken!,
			orderId: order.order_id,
			userId: order.owner_id,
			message: values.message,
		})
	}
	return (
		<div className='absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center bg-primary-418/40'>
			<div className='z-10 rounded-3xl border border-order-status-cancelled bg-neutral-gray-1'>
				<div className='flex h-[79px] flex-col items-center justify-center rounded-t-3xl bg-order-status-cancelled text-center text-white'>
					<h1 className='text-2xl uppercase'>Cancelling order confirmation</h1>
					<p className='pt-1 text-xl'>Enter the reason to cancel this order</p>
				</div>
				<form
					onSubmit={handleSubmit(handleOnSubmitCancel)}
					className='flex flex-col justify-center p-8 text-2xl'
				>
					<div className='m-3'>
						<p className='font-bold'>Order ID:</p>
						<p className=''>{order.order_id}</p>
					</div>
					<MultilineTextField
						type='text'
						label='Reason: '
						placeholder='Order Cancel Reason'
						register={register('message')}
						error={Boolean(errors?.message)}
						helperText={errors?.message?.message}
						className='m-2.5 h-[145px]'
					/>
					<div className='flex justify-end'>
						<Button
							className='m-2.5 w-36 border-0 bg-order-status-cancelled text-center text-xl'
							type='submit'
						>
							Confirm
						</Button>
						<Button
							className='m-2.5  w-36 border-order-status-cancelled bg-neutral-gray-1 text-xl text-order-status-cancelled'
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
