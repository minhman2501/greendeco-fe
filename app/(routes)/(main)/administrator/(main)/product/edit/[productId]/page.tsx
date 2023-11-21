'use client'
import Block from '@/app/_components/Block'
import ProductEditForm from './ProductEditForm'
import { useQuery } from '@tanstack/react-query'
import { getProductBaseById } from '@/app/_api/axios/product'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'

export default function EditProductPage({
	params: { productId },
}: {
	params: {
		productId: string
	}
}) {
	const productQuery = useQuery({
		queryKey: [UseQueryKeys.Product, ADMIN_QUERY_KEY, productId],
		queryFn: () => getProductBaseById(productId),
	})

	const { data, isSuccess, isError } = productQuery

	return (
		<div className='min-h-screen py-comfortable'>
			<Block>
				{isSuccess && (
					<>
						<h1>Edit Product</h1>
						<div className='mt-comfortable border-x-[1px] border-x-primary-625-60 px-comfortable'>
							<ProductEditForm {...data.items} />
						</div>
					</>
				)}
			</Block>
		</div>
	)
}
