import { ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { getCookie } from '@/app/_hooks/useCookie'
import axios from 'axios'

const USER_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/user`

const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)

export const userApi = axios.create({
	baseURL: USER_URL,
	headers: {
		Authorization: `Bearer ${accessToken}`,
	},
})

userApi.defaults.headers.common['Content-Type'] = 'application/json'

export const getUserProfile = async () => {
	return await userApi.get('/me').then((res) => res.data)
}
