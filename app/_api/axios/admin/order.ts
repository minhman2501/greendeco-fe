import { OrderData, OrderListData, OrderProductData, orderApi } from '../order'
import axios from 'axios'
import formatDate from '@/app/_hooks/useFormatDate'
import { FilterParams, fieldJSONParse } from '../product'

const ORDER_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}`

type AdminAccessTokenType = string | undefined

export type OrderTableData = {
	OrderData: OrderData
	owner_info: OrderInfo
	order_state: OrderState
	OrderPrice: OrderTotalData
}

export type OrderInfo = {
	order_id: string
	user_name: string
	userPhoneNumber: string
}

export type OrderState = {
	order_id: string
	state: string
}

export const adminOrderApi = axios.create({
	baseURL: ORDER_URL,
})

export type OrderTotalData = {
	total: string
	actual_price: string
}

export const getOrderListAsAdministrator = async (
	adminAccessToken: AdminAccessTokenType,
	params?: FilterParams,
) => {
	let paramAfterJSON
	if (params) {
		paramAfterJSON = fieldJSONParse(params)
	}
	return await adminOrderApi
		.get<OrderListData>('/order/all/', {
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
			params: { ...paramAfterJSON },
		})
		.then((res) => res.data)
}

export const getOrderTotalAsAdministrator = async (
	adminAccessToken: AdminAccessTokenType,
	id: string,
) => {
	return await adminOrderApi
		.get<OrderTotalData>(`/order/${id}/total/`, {
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		})
		.then((res) => res.data)
}

// getOrderListTable use to get order table data
export const getOrderListTable = async (
	adminAccessToken: AdminAccessTokenType,
	params?: FilterParams,
) => {
	const orders = await getOrderListAsAdministrator(adminAccessToken, params)
	return await Promise.all(
		orders.items.map(async (order) => {
			const price = await getOrderTotalAsAdministrator(adminAccessToken, order.id)
			var row: OrderTableData = {
				owner_info: {
					order_id: order.id,
					user_name: order.user_name,
					userPhoneNumber: order.user_phone_number,
				},
				order_state: {
					order_id: order.id,
					state: order.state,
				},
				OrderPrice: {
					...price,
				},
				OrderData: {
					...order,
				},
			}
			return row
		}),
	)
}

export const getOrderByIdAsAdminstrator = async (
	adminAccessToken: AdminAccessTokenType,
	orderId?: string,
) => {
	return await orderApi
		.get<OrderData>(`/order/${orderId}`, {
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		})
		.then((res) => res.data)
}

export const getOrderProductByOrderAsAdminstrator = async (
	adminAccessToken: AdminAccessTokenType,
	orderId: string,
) => {
	return await orderApi
		.get<OrderProductData>(`/order/${orderId}`, {
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		})
		.then((res) => res.data)
}
