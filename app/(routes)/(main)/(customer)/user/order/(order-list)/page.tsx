'use client'

import { getOrderListByUser } from '@/app/_api/axios/order'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from '@/app/_hooks/useQueryParams'
import { FilterParams } from '@/app/_api/axios/product'

export default function OrderHistoryPage() {
	const { queryObject } = useQueryParams<FilterParams>()

	const userOrderListQuery = useQuery({
		queryKey: ['order', 'user', queryObject],
		queryFn: () => getOrderListByUser(queryObject),
	})

	const { data } = userOrderListQuery
	return <>{data?.items.map((item) => <>{item.user_name}</>)}</>
}
