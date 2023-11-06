import { AccessTokenType } from '@/app/_types'
import axios from 'axios'
import { UserProfileResponseData } from './user'
import { VariantData } from './product'

const CART_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/cart`

type CartInfoData = {
	id: string
	owner: UserProfileResponseData['id']
	description: string
	created_at: string
	updated_at: string
}

type CartInfoFromUserResponseData = {
	items: CartInfoData
	page: number
	page_size: number
	next: Boolean
	prev: Boolean
}

type CreateNewCartResponseData = {
	id: CartInfoData['id']
}

type CartItemData = {
	id: string
	cart: CartInfoData['id']
	variant: VariantData['id']
	quantity: number
	created_at: string
	updated_at: string
}

type CartItemListResponseData = {
	items: CartItemData[]
	page: number
	page_size: number
	next: Boolean
	prev: Boolean
}

export const cartApi = axios.create({
	baseURL: CART_URL,
})

cartApi.defaults.headers.common['Content-Type'] = 'application/json'

export const getCartInfoFromUser = async (accessToken: AccessTokenType) => {
	return await cartApi
		.get<CartInfoFromUserResponseData>('', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
}

export const createNewCart = async (accessToken: AccessTokenType) => {
	return await cartApi
		.post<CreateNewCartResponseData>('', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
}

export const getCartItemListFromCartId = async (cartId: string, accessToken: AccessTokenType) => {
	return await cartApi
		.get<CartItemListResponseData>(`/${cartId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
}
