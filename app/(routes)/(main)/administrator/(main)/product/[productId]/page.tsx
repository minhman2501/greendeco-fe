'use client'

import { getProductBaseById } from '@/app/_api/axios/product'
import Block from '@/app/_components/Block'
import { useQuery } from '@tanstack/react-query'
import ProductEditingForm from './ProductSetting'
export default function ProductDetailManagementPage({
	params,
}: {
	params: {
		productId: string
	}
}) {
	const { productId } = params

	const productQuery = useQuery({
		queryKey: ['adminProduct', productId],
		queryFn: () => getProductBaseById(productId),
	})

	return (
		<>
			{productQuery.isSuccess && (
				<div className='min-h-screen py-comfortable'>
					<Block>
						<h1>{productQuery.data.items.name}</h1>
						<ProductEditingForm product={productQuery.data.items} />
					</Block>
				</div>
			)}
		</>
	)
}
