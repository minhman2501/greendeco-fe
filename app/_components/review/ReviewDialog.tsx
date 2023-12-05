import { ProductData } from '@/app/_api/axios/product'
import Image from 'next/image'
import CreateReviewForm from './ReviewForm'

export type ReviewDialogProps = {
	productId: ProductData['id']
	productName: ProductData['name']
	images: ProductData['images']
}
export default function ReviewDialog(props: ReviewDialogProps) {
	return (
		<div className='flex min-w-[500px] rounded-[16px] bg-neutral-gray-1 p-comfortable'>
			<CreateReviewForm />
		</div>
	)
}
