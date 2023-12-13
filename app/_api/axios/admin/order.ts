import { OrderData, OrderListData, OrderProductData, orderApi } from '../order'
import axios from 'axios'
import { FilterParams, fieldJSONParse } from '../product'
import { OrderState as StateOfOrder } from '@/app/_configs/constants/paramKeys'
import { createNotification, sendNotification } from './notification'
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
	owner_id: string
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
					owner_id: order.owner_id,
				},
				OrderPrice: { ...price },
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

export type OrderStatusRequest = {
	adminAccessToken: AdminAccessTokenType
	orderId: string
	state: string
}

export const updateOrderStatus = async ({
	adminAccessToken,
	orderId,
	state,
}: OrderStatusRequest) => {
	return await orderApi
		.put(
			`/${orderId}`,
			{
				state: state,
			},
			{
				headers: {
					Authorization: `Bearer ${adminAccessToken}`,
				},
			},
		)
		.then((res) => res.data)
}

export type ProcessStatusRequest = {
	adminAccessToken: AdminAccessTokenType
	orderId: string
	paid_at: string
}

// updateProcessStatus only use for only update process order status
export const updateOrderProcessStatus = async ({
	adminAccessToken,
	orderId,
	paid_at,
}: ProcessStatusRequest) => {
	return await orderApi
		.put(
			`/${orderId}`,
			{
				paid_at: paid_at,
				state: StateOfOrder.Processing,
			},
			{
				headers: {
					Authorization: `Bearer ${adminAccessToken}`,
				},
			},
		)
		.then((res) => res.data)
}

export type CancelStatusRequest = {
	adminAccessToken: AdminAccessTokenType
	orderId: string
	message: string
	userId: string
}
// updateCancelStatus only use for only update cancelled order status
// fuction will update cancel status then create new noti send for owner
export const updateOrderCancelStatus = async ({
	adminAccessToken,
	orderId,
	message,
	userId,
}: CancelStatusRequest) => {
	const orderStatusRequest: OrderStatusRequest = {
		orderId: orderId,
		adminAccessToken: adminAccessToken,
		state: StateOfOrder.Cancelled,
	}
	await updateOrderStatus(orderStatusRequest)
	const newNoti = await createNotification(
		adminAccessToken,
		`Your Order ${orderId} has been cancelled`,
		message,
	)
	return await sendNotification(adminAccessToken, newNoti.id, [userId])
}
