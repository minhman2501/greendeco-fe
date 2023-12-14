import { getProductList } from '@/app/_api/axios/product'
import ProductCard from '@/app/_components/product/ProductCard'
import { UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { FEATURE_PRODUCT_PARAMS } from '@/app/_configs/constants/variables'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function ProductList({ type }: { type: 'new' | 'topRated' | 'cheap' }) {
	const featureProductParams = useMemo(() => FEATURE_PRODUCT_PARAMS, [])
	console.log('render')

	const params = featureProductParams[type]

	const featureProductQuery = useQuery({
		queryKey: [UseQueryKeys.Product, type],
		queryFn: () =>
			getProductList({
				limit: 5,
				...params,
			}),
	})

	const { data, isLoading, isSuccess } = featureProductQuery

	return (
		<>
			{isLoading && <span className='h-[360px]'>Loading</span>}
			{data && isSuccess && (
				<div className='grid grid-cols-5 gap-cozy'>
					{data.items.map((item) => (
						<ProductCard
							product={item}
							key={item.id}
						/>
					))}
				</div>
			)}
		</>
	)
}
