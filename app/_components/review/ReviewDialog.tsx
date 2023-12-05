import { ProductData } from '@/app/_api/axios/product'
import CreateReviewForm from './ReviewForm'

export type ReviewDialogProps = {
	productId: ProductData['id']
	productName: ProductData['name']
	images: ProductData['images']
}
export default function ReviewDialog(props: ReviewDialogProps) {
	return <CreateReviewForm />
}
