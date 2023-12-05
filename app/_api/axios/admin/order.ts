import { UserProfileResponseData } from '../user'
import { OrderListData, OrderData } from '../order'
import axios from 'axios'

const ORDER_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}`

type AdminAccessTokenType = string | undefined

export type OrderTableData = {
	id: string
	owner_info: OrderInfo
	owner_id: UserProfileResponseData['id']
	user_name: string
	user_email: UserProfileResponseData['email']
	shipping_address: string
	user_phone_number: UserProfileResponseData['phoneNumber']
	state: string
	order_state: OrderState
	coupon_id: string | null
	coupon_discount: number
	paid_at: string | null
	created_at: string
	updated_at: string
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

export const getOrderListAsAdministrator = async (adminAccessToken: AdminAccessTokenType) => {
	return await adminOrderApi
		.get<OrderListData>('/order/all/', {
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		})
		.then((res) => res.data)
}
