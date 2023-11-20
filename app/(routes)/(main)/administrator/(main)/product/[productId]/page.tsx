'use client'

import { getProductBaseById } from '@/app/_api/axios/product'
import Block from '@/app/_components/Block'
import { useQuery } from '@tanstack/react-query'
import ProductDetail from './ProductDetail'
import ProductVariantInfo from './ProductVariantInfo'
import Link from 'next/link'
import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'
export default function ProductDetailManagementPage({
	params,
}: {
	params: {
		productId: string
	}
}) {
	const { productId } = params

	const productQuery = useQuery({
		queryKey: ['product', 'admin', productId],
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
								className='btn btnSecondary'
								href={{
									pathname: `${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/edit/${productId}`,
								}}
							>
								Edit Product
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
