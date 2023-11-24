import { deleteProduct } from '@/app/_api/axios/admin/product'
import { ProductData } from '@/app/_api/axios/product'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { TrashIcon } from '@heroicons/react/24/solid'
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
			type='button'
			onClick={handleDeleteProduct}
		>
			<TrashIcon className='aspect-square h-[24px] text-status-error-mid hover:cursor-pointer hover:text-status-error' />
		</button>
	)
}
