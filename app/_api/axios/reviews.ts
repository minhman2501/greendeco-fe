import axios from 'axios'
import { ProductData } from './product'
import { UserProfileResponseData } from './user'

const REVIEW_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/review`

export type ReviewItemData = {
	id: string
	user_id: UserProfileResponseData['id']
	product_id: ProductData['id']
	content: string
	star: number
	firstName: UserProfileResponseData['firstName']
	lastName: UserProfileResponseData['lastName']
	avatar: UserProfileResponseData['avatar']
	created_at: string
}

export type ReviewListResponseData = {
	items: ReviewItemData[]
	page: number
	page_size: number
	next: boolean
	prev: boolean
}

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

export type ReviewSortParams = {
	limit: number
	offSet?: number
	sort?: 'asc' | 'desc'
	sortBy?: string
	star?: number
	user_id?: string
}

export const reviewApi = axios.create({
	baseURL: REVIEW_URL,
})

reviewApi.defaults.headers.common['Content-Type'] = 'application/json'

export const getReviewListByProductId = async (
	productId: ProductData['id'],
	params?: ReviewSortParams,
) => {
	return await reviewApi
		.get<ReviewListResponseData>(`/product/${productId}`, {
			params: params ? { ...params } : null,
		})
		.then((res) => res.data)
}

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
