'use client'
import { FilterParams, getProductList } from '@/app/_api/axios/product'
import ProductCardsGrid from '@/app/_components/product/ProductGrid'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from '@/app/_hooks/useQueryParams'
import Pagination from './Pagination'

export default function ProductListPage() {
	const { queryObject } = useQueryParams<FilterParams>()

	const productListQuery = useQuery({
		queryKey: ['product', queryObject],
		queryFn: () =>
			getProductList({
				...queryObject,
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
				<Pagination
					offSet={productListQuery.data.page}
					next={productListQuery.data.next}
					prev={productListQuery.data.prev}
				/>
			</>
		)
}
