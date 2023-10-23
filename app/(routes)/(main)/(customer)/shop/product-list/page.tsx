'use client'
import { FilterParams, getProductList } from '@/app/_api/axios/product'
import ProductCardsGrid from '@/app/_components/product/ProductGrid'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from '@/app/_hooks/useQueryParams'
import Pagination from './Pagination'
import { SortMenu } from './ProductSortMenu'
import FilterSideBar from './ProductFilterSideBar'
import ProductListLoading from './loading'

export default function ProductListPage() {
	const { queryObject } = useQueryParams<FilterParams>()

	const productListQuery = useQuery({
		queryKey: ['product', queryObject],
		queryFn: () =>
			getProductList({
				limit: 4,
				...queryObject,
			}),
	})

	return (
		<div className='grid grid-cols-12 gap-comfortable py-comfortable'>
			<div className='col-span-3'>
				<FilterSideBar />
			</div>

			<div className='col-span-9'>
				<div className='flex-col-start gap-cozy'>
					<div className='flex w-full items-center justify-end'>
						<SortMenu />
					</div>
					{productListQuery.isLoading && <ProductListLoading />}
					{productListQuery.data?.items && (
						<>
							<ProductCardsGrid
								productList={productListQuery.data.items}
								columns={4}
								gap='compact'
							/>
							<Pagination
								next={productListQuery.data.next}
								prev={productListQuery.data.prev}
							/>
						</>
					)}
				</div>

				{productListQuery.data?.page_size === 0 && <div>Out of product</div>}
			</div>
		</div>
	)
}
