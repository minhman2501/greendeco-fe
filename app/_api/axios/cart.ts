import { AccessTokenType } from '@/app/_types'
import axios from 'axios'
import { UserProfileResponseData } from './user'
import { VariantData } from './product'
import { headers } from 'next/dist/client/components/headers'

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

type AddItemRequestData = {
	cart_id: CartInfoData['id']
	quantity: number
	variant_id: VariantData['id']
}

type AddItemResponseData = {
	id: CartItemData['id']
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
		.post<CreateNewCartResponseData>(
			'',
			{
				//NOTE: In the future, the description will have username + Cart
				description: 'User Cart',
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		)
		.then((res) => res.data)
}

export const getCartItemListFromCartId = async (cartId: string, accessToken: AccessTokenType) => {
	return await cartApi
		.get<CartItemListResponseData>(`/${cartId}/product`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
}

export const addCartItem = async (data: AddItemRequestData, accessToken: AccessTokenType) => {
	return await cartApi.post<CartItemListResponseData>(
		'/product',
		{ ...data },
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	)
}

export const changeCartItemQuantity = async (
	itemId: CartItemData['id'],
	quantity: number,
	accessToken: AccessTokenType,
) => {
	return await cartApi.put(
		`/product/${itemId}`,
		{
			quantity: quantity,
		},
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	)
}

export const removeCartItem = async (itemId: CartItemData['id'], accessToken: AccessTokenType) => {
	return await cartApi.delete(`/product/${itemId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
}

export const clearCartItemList = async (
	cartId: CartInfoData['id'],
	accessToken: AccessTokenType,
) => {
	return await cartApi.delete(`/${cartId}/clear`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
}
