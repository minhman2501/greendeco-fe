import axios from 'axios'

const AUTHENTICATION_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/auth`

type RegisterData = {
	firstName: string
	identifier: string
	lastName: string
	email: string
	phoneNumber: string
	password: string
}

export const authApi = axios.create({
	baseURL: AUTHENTICATION_URL,
	withCredentials: true,
})

authApi.defaults.headers.common['Content-Type'] = 'application/json'

export const registerAccount = async (newAccount: RegisterData) => {
	return await authApi.post('/register', newAccount).then((res) => res.data)
}
