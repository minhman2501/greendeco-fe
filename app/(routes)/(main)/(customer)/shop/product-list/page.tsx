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
				limit: 3,
				...queryObject,
			}),
	})

	if (productListQuery.data)
		return (
			<>
				{productListQuery.data.page_size > 0 ? (
					<div className='flex-col-start gap-cozy'>
						<span>count {productListQuery.data.page_size}</span>
						<ProductCardsGrid
							productList={productListQuery.data.items}
							columns={4}
							gap='cozy'
						/>
						<Pagination
							next={productListQuery.data.next}
							prev={productListQuery.data.prev}
						/>
					</div>
				) : (
					<div>Out of product</div>
				)}
			</>
		)
}
