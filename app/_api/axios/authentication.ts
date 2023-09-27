import axios from 'axios'

const AUTHENTICATION_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API_LOCAL}/auth`

type RegisterData = {
	firstName: string
	identifier: string
	lastName: string
	email: string
	phoneNumber: string
	password: string
}
type ResetPasswordData = {
	password: string
	token: string
}

export const authApi = axios.create({
	baseURL: AUTHENTICATION_URL,
})

authApi.defaults.headers.common['Content-Type'] = 'application/json'

export const registerAccount = async (newAccount: RegisterData) => {
	return await authApi.post('/register', newAccount).then((res) => res.data)
}
export const sendEmailToResetPassword = async ({ email }: { email: string }) => {
	return await authApi.post('/forgot-password', { email }).then((res) => res.data)
}

export const resetPassword = async (resetPasswordData: ResetPasswordData) => {
	return await authApi
		.post(
			'/reset-password',
			{ password: resetPasswordData.password },
			{
				headers: {
					Authorization: `Bearer ${resetPasswordData.token}`,
				},
			},
		)
		.then((res) => res.data)
}
