import axios, { AxiosError } from 'axios'
import { CartInfoData } from './cart'
import { headers } from 'next/dist/client/components/headers'
import { getCookie } from 'cookies-next'
import {
	ACCESS_TOKEN_COOKIE_NAME,
	ADMIN_ACCESS_TOKEN_COOKIE_NAME,
} from '@/app/_configs/constants/cookies'
import { UserProfileResponseData } from './user'

const ORDER_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/order`

type OrderState = 'draft' | 'processing' | 'completed' | 'cancelled'

export type CreateOrderData = {
	cart_id: CartInfoData['id']
	coupon_id?: string
	shipping_address: OrderData['shipping_address']
}

type CreateOrderRequestData = {
	createOrderData: CreateOrderData
	accessToken: string | undefined
}

export type OrderData = {
	id: string
	owner_id: UserProfileResponseData['id']
	user_name: string
	user_email: UserProfileResponseData['email']
	shipping_address: string
	user_phone_number: UserProfileResponseData['phoneNumber']
	state: OrderState
	coupon_id: string | null
	coupon_discount: number
	paid_at: string | null
	created_at: string
	updated_at: string
}

export type OrderListData = {
	items: OrderData[]
	next: boolean
	page: number
	page_size: number
	prev: boolean
}

type OrderPrice = {
	actual_price: number
	total: number
}

export type CreateOrderResponseData = {
	id: OrderData['id']
}

export const orderApi = axios.create({
	baseURL: ORDER_URL,
})

export const createOrder = async (data: Omit<CreateOrderData, 'cart_id'>) => {
	const cartId = getCookie('cartId')?.toString()
	const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

	if (!cartId) throw new AxiosError('There is no cart available', '404')
	if (!accessToken) throw new AxiosError('Unauthorized', '401')

	const orderData: CreateOrderData = {
		cart_id: cartId,
		...data,
	}

	return await orderApi.post<CreateOrderResponseData>(
		'',
		{
			...orderData,
		},
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	)
}

export const getOrderPrice = async (orderId: OrderData['id']) => {
	const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

	return await orderApi
		.get<OrderPrice>(`${orderId}/total`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
}
