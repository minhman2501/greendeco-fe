'use client'

import { useQuery } from '@tanstack/react-query'
import CommentSection from './ProductCommentSection'
import DetailContainer from './ProductDetailContainer'
import ImageGallery from './ProductImageGallery'
import Price from './ProductPrice'
import { getProductDetailById } from '@/app/_api/axios/product'

export default function ProductDetailPage({
	params,
}: {
	params: {
		productId: string
	}
}) {
	const productDetailQuery = useQuery({
		queryKey: ['product', params.productId],
		queryFn: () => getProductDetailById(params.productId),
		onSuccess: (data) => console.log(data),
	})

	const { data, isLoading, isSuccess, isError } = productDetailQuery

	return (
		<>
			{data && (
				<div className='flex-col-start gap-cozy'>
					<ImageGallery
						variantImage={data.variants[0].image}
						productImages={data.product.images}
					/>
					<div className='grid grid-cols-2 gap-cozy'>
						<DetailContainer
							product={data.product}
							variants={data.variants}
						/>
						<div className='flex-col-start gap-cozy'>
							<Price
								price={data.variants[0].price}
								currency={data.variants[0].currency}
							/>
							<CommentSection />
						</div>
					</div>
				</div>
			)}
		</>
	)
}
