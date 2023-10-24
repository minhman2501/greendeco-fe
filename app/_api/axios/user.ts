import { ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import axios from 'axios'
import { getCookie } from 'cookies-next'

const USER_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/user`

const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)

export type UserProfileResponseData = {
	id: string
	avatar: string | null
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
}

export type UserProfileUpdateData = {
	avatar: string | null
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
}

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
export const updatetUserProfile = async (data: UserProfileUpdateData) => {
	return await userApi.put<UserProfileResponseData>('/update', data).then((res) => res.data)
}
