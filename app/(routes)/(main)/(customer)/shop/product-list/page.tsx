'use client'
import { FilterParams, getProductList } from '@/app/_api/axios/product'
import ProductCardsGrid from '@/app/_components/product/ProductGrid'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from '@/app/_hooks/useQueryParams'
import Pagination from './Pagination'
import { SortMenu } from './ProductSortMenu'
import FilterSideBar from './ProductFilterSideBar'
import ProductListLoading from './loading'
import { FaceFrownIcon } from '@heroicons/react/24/solid'

export default function ProductListPage() {
	const { queryObject } = useQueryParams<FilterParams>()

	const productListQuery = useQuery({
		queryKey: ['product', queryObject],
		queryFn: () =>
			getProductList({
				limit: 20,
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
					{productListQuery.data?.page_size !== 0 && (
						<div className='flex w-full items-center justify-end'>
							<SortMenu />
						</div>
					)}
					{productListQuery.isLoading && <ProductListLoading />}
					{productListQuery.data?.items && productListQuery.data.page_size !== 0 && (
						<>
							<ProductCardsGrid
								productList={productListQuery.data.items}
								columns={4}
								gap='cozy'
							/>
							<Pagination
								next={productListQuery.data.next}
								prev={productListQuery.data.prev}
							/>
						</>
					)}
				</div>

				{productListQuery.data?.page_size === 0 && <OutOfProductMessage />}
			</div>
		</div>
	)
}

function OutOfProductMessage() {
	return (
		<div className='flex h-[200px] w-full items-center justify-center text-primary-418'>
			<span className='flex-col-center gap-compact'>
				<FaceFrownIcon className='aspect-square h-[80px]' />

				<p className='text-body-md'>Sorry! We can&apos;t find any product</p>
			</span>
		</div>
	)
}
