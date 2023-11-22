import { deleteProduct } from '@/app/_api/axios/admin/product'
import { ProductData } from '@/app/_api/axios/product'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function DeleteProduct({ productId }: { productId: ProductData['id'] }) {
	const queryClient = useQueryClient()
	const deleteProductMutation = useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [UseQueryKeys.Product, ADMIN_QUERY_KEY] })
		},
	})

	const handleDeleteProduct = () => {
		deleteProductMutation.mutate({
			productId: productId,
			adminAccessToken:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNzAwNzU1NTAyLCJ1c2VyX2lkIjoiM2NkNDZhOTUtNWFhYi00MTk1LTkzNTgtMzg1YWQ5YTMyZGU5In0.AoDIvWGyCkhRURd7zPB0pNA6M4o7rvgsIyd1_tVKSh4',
		})
	}
	return (
		<button
			onClick={handleDeleteProduct}
			className='ml-[16px]'
		>
			delete
		</button>
	)
}
