import { getCartInfoFromUser, getCartItemListFromCartId, createNewCart } from '../_api/axios/cart'
import { getCookie } from 'cookies-next'
import { ACCESS_TOKEN_COOKIE_NAME } from '../_configs/constants/cookies'
import { AxiosError } from 'axios'

const userAccessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

export const handleGetCartId = async () => {
	return await getCartInfoFromUser(userAccessToken)
		.then((data) => data.items.id)
		.catch((e: AxiosError) => {
			if (e.response?.status === 404) {
				console.log('not found')
				return createNewCart(userAccessToken).then((data) => data.id)
			}
		})
		.then((data) => data)
}

export const handleGetCartItemListByCartId = async () => {
	const cartId = await handleGetCartId().then((data) => data)
	if (cartId) return getCartItemListFromCartId(cartId, userAccessToken).then((data) => data)
}
