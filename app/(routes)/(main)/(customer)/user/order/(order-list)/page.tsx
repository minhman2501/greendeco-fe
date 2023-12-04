'use client'

import { getOrderListByUser } from '@/app/_api/axios/order'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from '@/app/_hooks/useQueryParams'
import { FilterParams } from '@/app/_api/axios/product'
import UserOrderList from './UserOrderList'
import OrderListPagination from './OrderPagination'

export default function OrderHistoryPage() {
	const { queryObject } = useQueryParams<FilterParams>()

	const userOrderListQuery = useQuery({
		queryKey: ['order', 'user', queryObject],
		queryFn: () =>
			getOrderListByUser({
				limit: 10,
				...queryObject,
			}),
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	})

	const { data } = userOrderListQuery

	return (
		<>
			{data && data.page_size > 0 && (
				<div className='flex-col-start gap-cozy'>
					<UserOrderList orderList={data.items} />

					<OrderListPagination
						next={data.next}
						prev={data.prev}
					/>
				</div>
			)}
		</>
	)
}
