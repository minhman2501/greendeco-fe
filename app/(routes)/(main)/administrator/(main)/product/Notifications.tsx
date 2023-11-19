import React from 'react'
import { ToastContentProps, toast, ToastOptions } from 'react-toastify'
import Link from 'next/link'
import { ProductData } from '@/app/_api/axios/product'
import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'

export const notifyCreateProductSuccess = (productId: string, options?: ToastOptions) => {
	console.log(productId)

	toast.success(<CreateProductSuccessMessage productId={productId} />, {
		position: 'top-center',
		onClose: options?.onClose,
	})
}

const CreateProductSuccessMessage = ({ productId }: { productId: ProductData['id'] }) => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-primary-625'>Product Has Been Created</h3>
		<p>
			Redirecting to the{' '}
			<Link
				href={`${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/${productId}`}
				className='hover:font-bold'
			>
				Product Detail
			</Link>
		</p>
	</div>
)
