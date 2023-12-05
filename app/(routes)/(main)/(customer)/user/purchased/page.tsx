'use client'

import { useGetProductsFromCompletedOrders } from '@/app/_hooks/useGetProductsFromCompletedOrders'
import { useQuery } from '@tanstack/react-query'
import PurchasedProductList from './PurchasedProductList'

export default function UserReviewPage() {
	const { getProductsFromCompletedOrders } = useGetProductsFromCompletedOrders()
	const testQuery = useQuery({
		queryKey: ['test'],
		queryFn: getProductsFromCompletedOrders,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		retry: false,
	})

	const { data } = testQuery
	console.log(data)

	return <div>{data && <PurchasedProductList productList={data} />}</div>
}
