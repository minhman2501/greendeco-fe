'use client'

import { getOrderListByUser } from '@/app/_api/axios/order'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from '@/app/_hooks/useQueryParams'
import { FilterParams } from '@/app/_api/axios/product'
import UserOrderList from './UserOrderList'

export default function OrderHistoryPage() {
	const { queryObject } = useQueryParams<FilterParams>()

	const userOrderListQuery = useQuery({
		queryKey: ['order', 'user', queryObject],
		queryFn: () => getOrderListByUser(queryObject),
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	})

	const { data } = userOrderListQuery
	return <>{data && data.page_size > 0 && <UserOrderList orderList={data.items} />}</>
}
