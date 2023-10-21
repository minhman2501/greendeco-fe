'use client'
import { FilterParams, getProductList } from '@/app/_api/axios/product'
import ProductCardsGrid from '@/app/_components/product/ProductGrid'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from '@/app/_hooks/useQueryParams'

export default function ProductListPage() {
	const { queryObject, queryParams } = useQueryParams<FilterParams>()

	const field = queryParams?.get('field')
	const result = field ? field : ''
	result !== '' ? console.log('field', JSON.parse(result)) : null
	const productListQuery = useQuery({
		queryKey: ['product', field],
		queryFn: () =>
			getProductList({
				field: JSON.parse(result),
			}),
	})

	if (productListQuery.data)
		return (
			<>
				<div className='flex items-center justify-between'>
					<span>count {productListQuery.data.page_size}</span>
				</div>
				<ProductCardsGrid
					productList={productListQuery.data.items}
					columns={4}
					gap='cozy'
				/>
			</>
		)
}
