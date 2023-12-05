import { ProductData } from '@/app/_api/axios/product'
import Image from 'next/image'
import CreateReviewForm from './ReviewForm'

export type ReviewDialogProps = {
	productId: ProductData['id']
}
export default function ReviewDialog(props: ReviewDialogProps) {
	return (
		<div className='flex min-w-[600px] rounded-[16px] bg-neutral-gray-1 p-comfortable'>
			<CreateReviewForm productId={props.productId} />
		</div>
	)
}
