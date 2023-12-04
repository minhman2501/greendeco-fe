'use client'

import { OrderFullDetailData, getOrderFullDetailById } from '@/app/_api/axios/order'
import { useQuery } from '@tanstack/react-query'
import OrderDetailContainer from './OrderDetailContainer'
import OrderProductList from './OrderProductList'
import OrderPrice from './OrderPrice'
import UserOrderDetailLoading from './loading'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'

export default function OrderDetailPage({
	params: { orderId },
}: {
	params: {
		orderId: string
	}
}) {
	const orderDetailQuery = useQuery({
		queryKey: ['order', orderId],
		queryFn: () => getOrderFullDetailById(orderId),
	})

	const { data, isLoading, isError } = orderDetailQuery
	return (
		<div>
			{isLoading && <UserOrderDetailLoading />}
			{data && (
				<>
					<h1 className='mb-cozy'>Order Detail</h1>
					<div className='px-cozy'>
						<OrderDetailContainer order={data.order} />
						<OrderProductList productList={data.productList} />
						<OrderPrice
							coupon_id={data.order.coupon_id}
							coupon_discount={data.order.coupon_discount}
							price={data.price}
						/>
					</div>
				</>
			)}
			{isError && <ErrorMessage />}
		</div>
	)
}

function ErrorMessage() {
	return (
		<div className='flex h-[200px] w-full items-center justify-center text-status-error'>
			<span className='flex-col-center gap-compact'>
				<ExclamationTriangleIcon className='aspect-square h-[80px]' />

				<p className='text-body-md font-semi-bold'>
					Oops, something went wrong! Please try again later.
				</p>
			</span>
		</div>
	)
}
