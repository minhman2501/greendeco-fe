'use client'
import Block from '@/app/_components/Block'
import CreateVariantForm from './CreateVariantForm'
import useQueryParams from '@/app/_hooks/useQueryParams'

type QueryParam = {
	productId: string
}

export default function VariantManagement() {
	const { queryParams } = useQueryParams()
	const productId = queryParams.get('productId')
	const productName = queryParams.get('productName')
	return (
		<Block>
			<h1>Create Variant</h1>
			{productId && productName && (
				<CreateVariantForm
					productId={productId}
					productName={productName}
				/>
			)}
		</Block>
	)
}
