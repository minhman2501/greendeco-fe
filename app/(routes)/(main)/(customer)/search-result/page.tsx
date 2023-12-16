'use client'
import {
	FieldParams,
	FilterParams,
	getProductList,
	getProductListWithSearch,
} from '@/app/_api/axios/product'
import ProductCardsGrid from '@/app/_components/product/ProductGrid'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from '@/app/_hooks/useQueryParams'
import { ProductSortMenu } from './ProductSortMenu'
import ProductListLoading from './loading'
import { FaceFrownIcon } from '@heroicons/react/24/solid'
import ProuductListError from './error'
import ProductListPagination from './ProductListPagination'

export default function ProductListPage() {
	const { queryObject } = useQueryParams<FilterParams>()
	const lmao: FilterParams = { ...queryObject }

	const field: FieldParams = lmao.field ? JSON.parse(lmao.field) : null

	console.log(field?.name?.length)

	const productListQuery = useQuery({
		queryKey: ['product', queryObject],
		queryFn: () =>
			getProductListWithSearch({
				limit: 20,
				...queryObject,
			}),
		refetchOnWindowFocus: false,
	})

	return (
		<div className='flex-col-start gap-cozy py-comfortable'>
			{/*NOTE: Because isError default false => doesn't cause rerender the SortMenu  */}
			{productListQuery.isError === false && productListQuery.data?.page_size !== 0 && (
				<div className='flex w-full items-center justify-end'>
					<ProductSortMenu />
				</div>
			)}

			{productListQuery.isLoading && <ProductListLoading />}

			{productListQuery.isSuccess && (
				<>
					{productListQuery.data.page_size > 0 ? (
						<>
							<ProductCardsGrid
								productList={productListQuery.data.items}
								columns={5}
								gap='cozy'
							/>
							<ProductListPagination
								next={productListQuery.data.next}
								prev={productListQuery.data.prev}
							/>
						</>
					) : (
						<OutOfProductMessage />
					)}
				</>
			)}
			{productListQuery.isError && <ProuductListError />}
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
