import { OrderData } from '@/app/_api/axios/order'
import React from 'react'
import { ToastOptions, toast } from 'react-toastify'
import Link from 'next/link'
import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'

export const notifyUpdateCancelSuccess = (orderId: string, options?: ToastOptions) => {
	toast.success(<UpdateOrderStateCancelSuccessMessage orderId={orderId} />, {
		position: 'top-center',
	})
}

const UpdateOrderStateCancelSuccessMessage = ({ orderId }: { orderId: OrderData['id'] }) => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-primary-625'>Order Has Been Cancelled</h3>
		<p>
			Redirecting to the{' '}
			<Link
				href={`${ADMINISTRATOR_ROUTE.ORDER.LINK}/${orderId}`}
				className='hover:font-bold'
			>
				Order Detail
			</Link>
		</p>
	</div>
)
