import { deleteProduct } from '@/app/_api/axios/admin/product'
import { ProductData } from '@/app/_api/axios/product'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export default function DeleteProduct({ productId }: { productId: ProductData['id'] }) {
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()

	const router = useRouter()

	const queryClient = useQueryClient()
	const deleteProductMutation = useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [UseQueryKeys.Product, ADMIN_QUERY_KEY] })
		},
		onError: () => {
			router.replace('/administrator/login')
		},
	})

	const handleDeleteProduct = () => {
		deleteProductMutation.mutate({
			productId: productId,
			adminAccessToken: adminAccessToken,
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
