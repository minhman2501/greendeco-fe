'use client'

import { getProductBaseById } from '@/app/_api/axios/product'
import Block from '@/app/_components/Block'
import { useQuery } from '@tanstack/react-query'
import ProductDetail from './ProductDetail'
import ProductVariantInfo from './ProductVariantInfo'
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
						<h1 className='mb-cozy'>{data.items.name}</h1>
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
