'use client'

import { getProductBaseById } from '@/app/_api/axios/product'
import Block from '@/app/_components/Block'
import { useQuery } from '@tanstack/react-query'
import ProductDetail from './ProductDetail'
import ProductVariantInfo from './ProductVariantInfo'
import Link from 'next/link'
import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { PencilSquareIcon } from '@heroicons/react/24/solid'

export default function ProductDetailManagementPage({
	params,
}: {
	params: {
		productId: string
	}
}) {
	const { productId } = params

	const productQuery = useQuery({
		queryKey: [UseQueryKeys.Product, ADMIN_QUERY_KEY, productId],
		queryFn: () => getProductBaseById(productId),
	})

	const { data, isSuccess, isError } = productQuery

	return (
		<>
			{isSuccess && (
				<div className='flex-col-start min-h-screen gap-comfortable py-comfortable'>
					<Block>
						<div className='mb-cozy flex items-center justify-between'>
							<h1>{data.items.name}</h1>
							<Link
								className='btn btnSecondary flex items-center gap-compact'
								href={{
									pathname: `${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/edit/${productId}`,
								}}
							>
								Edit Product
								<PencilSquareIcon className='aspect-square h-[24px]' />
							</Link>
						</div>
						<ProductDetail product={data.items} />
					</Block>

					<Block>
						<ProductVariantInfo
							productName={data.items.name}
							productId={data.items.id}
						/>
					</Block>
				</div>
			)}
		</>
	)
}
