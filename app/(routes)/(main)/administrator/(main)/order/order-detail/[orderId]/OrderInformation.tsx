import { OrderData, getOrderPrice } from '@/app/_api/axios/order'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { UseQueryKeys, ADMIN_QUERY_KEY } from '@/app/_configs/constants/queryKey'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

export default function OrderInformationWrapper({ order }: { order: OrderData }) {
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
	const totalQuery = useQuery({
		queryKey: [UseQueryKeys.Order, ADMIN_QUERY_KEY, UseQueryKeys.Price, order.id],
		queryFn: () => getOrderPrice(order.id, adminAccessToken),
	})

	return (
		<>
			{totalQuery.isLoading || (
				<div className='flex flex-col text-xl'>
					<div className='flex justify-between text-2xl'>
						<h4>Coupon Infomation:</h4>
					</div>
					<div className='flex justify-between'>
						<p>ID:</p>
						<b>{order.id}</b>
					</div>
					<div className='flex justify-between'>
						<p>Discount:</p>
						<b>{order.coupon_discount}%</b>
					</div>
					<div className='flex items-center justify-between  pt-3'>
						<b>Total Price:</b>
						<p>$ {totalQuery.data?.total}</p>
					</div>
					<div className='flex items-center justify-between pt-5 text-3xl'>
						<b className='text-primary-625-80'>Order Actual Price:</b>
						<b>$ {totalQuery.data?.actual_price}</b>
					</div>
				</div>
			)}
		</>
	)
}
