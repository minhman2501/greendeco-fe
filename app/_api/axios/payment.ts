import axios from 'axios'
import { OrderData } from './order'
import { AccessTokenType } from '@/app/_types'
import { getCookie } from 'cookies-next'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'

const PAYMENT_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/payment`

export const paymentApi = axios.create({
	baseURL: PAYMENT_URL,
})

type VNPayReturnData = {
	callback_url: string
}

paymentApi.defaults.headers.common['Content-Type'] = 'application/json'

export const createVNPayPayment = async (id: OrderData['id']) => {
	const accessToken: AccessTokenType = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

	return await paymentApi.post<VNPayReturnData>(
		'/vnpay_create',
		{
			id: id,
			type: 'VNPay',
		},
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	)
}
