import axios, { AxiosError } from 'axios'
import { CartInfoData } from './cart'
import { headers } from 'next/dist/client/components/headers'
import { getCookie } from 'cookies-next'
import {
	ACCESS_TOKEN_COOKIE_NAME,
	ADMIN_ACCESS_TOKEN_COOKIE_NAME,
} from '@/app/_configs/constants/cookies'

const ORDER_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/order`

export type CreateOrderData = {
	cart_id: CartInfoData['id']
	coupon_id?: string
	shipping_address: string
}

type CreateOrderRequestData = {
	createOrderData: CreateOrderData
	accessToken: string | undefined
}

type CreateOrderResponseData = {
	id: string
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
