import axios from 'axios'

const CART_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/cart`

export const cartApi = axios.create({
	baseURL: CART_URL,
})

cartApi.defaults.headers.common['Content-Type'] = 'application/json'

export const getCartFromUser = async (accessToken: string) => {
	return await cartApi
		.get('', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res)
}

export const createNewCart = async (accessToken: string) => {
	return await cartApi
		.post('', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res)
}

export const getCartItemsFromCartId = async (cartId: string, accessToken: string) => {
	return await cartApi
		.get(`/${cartId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res)
}
