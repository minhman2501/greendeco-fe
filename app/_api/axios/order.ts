import axios from 'axios'
import { CartInfoData } from './cart'
import { headers } from 'next/dist/client/components/headers'

const ORDER_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/order`

export type CreateOrderData = {
	cartId: CartInfoData['id']
	couponId?: string
	shipping_address: string
}

type CreateOrderRequestData = {
	createOrderData: CreateOrderData
	accessToken: string | undefined
}

export const orderApi = axios.create({
	baseURL: ORDER_URL,
})

export const createOrder = async (data: CreateOrderRequestData) => {
	const { createOrderData, accessToken } = data
	return await orderApi.post(
		'',
		{
			...createOrderData,
		},
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	)
}
