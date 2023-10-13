import { ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { getCookie } from '@/app/_hooks/useCookie'
import axios from 'axios'

const USER_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/user`

export type UserProfileResponseData = {
	id: string
	avatar: string
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
}

export type UserProfileUpdateRequestData = {
	avatar: string
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
}

const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)

export const userApi = axios.create({
	baseURL: USER_URL,
	headers: {
		Authorization: `Bearer ${accessToken}`,
	},
})

userApi.defaults.headers.common['Content-Type'] = 'application/json'

export const getUserProfile = async () => {
	return await userApi.get<UserProfileResponseData>('/me').then((res) => res.data)
}
export const updatetUserProfile = async (data: UserProfileUpdateRequestData) => {
	console.log(data)

	return await userApi.put<UserProfileResponseData>('/update', data).then((res) => res.data)
}
