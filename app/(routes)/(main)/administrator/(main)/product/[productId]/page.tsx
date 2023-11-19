'use client'

import { getProductBaseById } from '@/app/_api/axios/product'
import Block from '@/app/_components/Block'
import { useQuery } from '@tanstack/react-query'
import ProductEditingForm from './ProductSetting'
import VariantList from './VariantList'
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
						<h1>{data.items.name}</h1>
						<ProductEditingForm product={data.items} />
					</Block>

					<Block>
						<VariantList
							productName={data.items.name}
							productId={data.items.id}
						/>
					</Block>
				</div>
			)}
		</>
	)
}
