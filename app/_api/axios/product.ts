import axios from 'axios'

const PRODUCT_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/product`

export type ProductData = {
	id: string
	category: string
	name: string
	price: string
	size: string
	available: boolean
	type: string
	images: string[]
	detail: string
	description: string
	light: string
	difficulty: string
	water: string
	created_at: string
	default_variant: string
	currency: string
}

export type ProductByIdResponseData = {
	items: ProductData
	page: string
	page_size: string
	next: string
	prev: string
}

type ProductListData = {
	items: ProductData[]
	next: boolean
	page: number
	page_size: number
	prev: boolean
}

export type FilterParams = {
	limit?: number
	offSet?: number
	sort?: 'asc' | 'desc'
	sortBy?: string
	field?: string
} | null

const fieldJSONParse = (params: FilterParams) => {
	if (params) {
		const { field, ...restParms } = params
		const fieldJSON = field ? JSON.parse(field) : null
		return { field: fieldJSON ? fieldJSON : null, ...restParms }
	}
}

export const productApi = axios.create({
	baseURL: PRODUCT_URL,
})

productApi.defaults.headers.common['Content-Type'] = 'application/json'

export const getProductList = async (params?: FilterParams) => {
	let paramAfterJSON
	if (params) {
		paramAfterJSON = fieldJSONParse(params)
	}

	return await productApi
		.get<ProductListData>('', {
			params: { ...paramAfterJSON },
		})
		.then((res) => res.data)
}

export const getProductById = async (productId: string) => {
	return await productApi
		.get<ProductByIdResponseData>(`/${productId}`)
		.then((res) => res.data.items)
}
