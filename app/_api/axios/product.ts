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

type ProductListData = {
	items: ProductData[]
	next: boolean
	page: number
	page_size: 2
	prev: boolean
}

export type FilterParams = {
	limit?: number
	offSet?: number
	sort?: 'asc' | 'desc'
	sortBy?: string
	field?: JSON
} | null

export const productApi = axios.create({
	baseURL: PRODUCT_URL,
})

productApi.defaults.headers.common['Content-Type'] = 'application/json'

export const getProductList = async (params?: FilterParams) => {
	return await productApi
		.get<ProductListData>('', {
			params: params,
		})
		.then((res) => res.data)
}
