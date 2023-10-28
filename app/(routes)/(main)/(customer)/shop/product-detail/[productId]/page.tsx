'use client'

import { useQuery } from '@tanstack/react-query'
import CommentSection from './ProductCommentSection'
import DetailContainer from './ProductDetailContainer'
import ImageGallery from './ProductImageGallery'
import Price from './ProductPrice'
import { ProductDetailData, VariantData, getProductDetailById } from '@/app/_api/axios/product'
import { useState } from 'react'

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

	return <>{data && <ContetnWrapper {...data} />}</>
}

function ContetnWrapper(props: ProductDetailData) {
	const { product, variants } = props

	const defaultVariant = variants.find((variant) => variant.id === product.default_variant)

	const [activeVariant, setActiveVariant] = useState<VariantData>(defaultVariant || variants[0])

	return (
		<div className='flex-col-start gap-cozy'>
			<ImageGallery
				defaultVariant={activeVariant}
				variantImage={activeVariant.image}
				productImages={product.images}
			/>
			<div className='grid grid-cols-2 gap-cozy'>
				<DetailContainer
					product={product}
					variants={variants}
					setActiveVariant={setActiveVariant}
				/>
				<div className='flex-col-start gap-cozy'>
					<Price
						price={activeVariant.price}
						currency={activeVariant.currency}
					/>
					<CommentSection />
				</div>
			</div>
		</div>
	)
}
