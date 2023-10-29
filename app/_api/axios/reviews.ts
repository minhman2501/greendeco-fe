import axios from 'axios'
import { ProductData } from './product'
import { UserProfileResponseData } from './user'

const REVIEW_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/review`

export type SendReviewData = {
	content: string
	product_id: ProductData['id']
	star: string
	user_id: UserProfileResponseData['id']
}

export type SendReviewRequestData = {
	accessToken: string
	reviewData: SendReviewData
}

export const reviewApi = axios.create({
	baseURL: REVIEW_URL,
})

reviewApi.defaults.headers.common['Content-Type'] = 'application/json'

export const sendReviewToProduct = async (data: SendReviewRequestData) => {
	const { accessToken, reviewData } = data
	return await reviewApi.post(
		'',
		{ ...reviewData },
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	)
}
