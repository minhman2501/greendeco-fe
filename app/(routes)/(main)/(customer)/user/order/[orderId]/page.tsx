'use client'

import { OrderFullDetailData, getOrderFullDetailById } from '@/app/_api/axios/order'
import { useQuery } from '@tanstack/react-query'
import OrderDetailContainer from './OrderDetailContainer'
import OrderProductList from './OrderProductList'
import OrderPrice from './OrderPrice'

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

	const { data } = orderDetailQuery
	return (
		<div>
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
		</div>
	)
}
