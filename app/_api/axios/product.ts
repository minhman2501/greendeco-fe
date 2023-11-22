import axios from 'axios'

const PRODUCT_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}`

export type ProductData = {
	id: string
	category: string
	name: string
	price: string
	size: string
	available: boolean
	is_publish: boolean
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

export type VariantData = {
	id: string
	available: boolean
	product: string
	name: string
	color: string
	color_name: string
	price: string
	image: string
	description: string
	currency: string
	created_at: string
	updated_at: string
}

export type VariantListResponseData = {
	items: VariantData[]
	next: boolean
	page: number
	page_size: number
	prev: boolean
}

export type DefaultVariantResponseData = {
	items: {
		variant: string
	}
	next: boolean
	page: number
	page_size: number
	prev: boolean
}

export type VariantInfoResponseData = {
	items: VariantData
	next: boolean
	page: number
	page_size: number
	prev: boolean
}
export type ProductDetailData = {
	product: ProductData
	variants: VariantData[]
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
		.get<ProductListData>('/product', {
			params: { ...paramAfterJSON },
		})
		.then((res) => res.data)
}

export const getProductBaseById = async (productId: string) => {
	return await productApi
		.get<ProductByIdResponseData>(`product/${productId}`)
		.then((res) => res.data)
}

export const getVariantsByProductId = async (productId: string) => {
	return await productApi
		.get<VariantListResponseData>(`variant/product/${productId}`)
		.then((res) => res.data)
}
export const getDefaultVariantByProductId = async (productId: string) => {
	return await productApi
		.get<DefaultVariantResponseData>(`variant/default/${productId}`)
		.then((res) => res.data.items.variant)
}

export const getVariantById = async (variantId: string) => {
	return await productApi
		.get<VariantInfoResponseData>(`variant/${variantId}`)
		.then((res) => res.data)
}

export const getProductDetailById = async (productId: string) => {
	return await Promise.all([
		getProductBaseById(productId),
		getVariantsByProductId(productId),
		getDefaultVariantByProductId(productId),
	]).then(([product, variants, defaultVariant]) => {
		const responseProduct = product.items
		responseProduct.default_variant = defaultVariant

		const productDetail: ProductDetailData = {
			product: responseProduct,
			variants: variants.items,
		}
		return productDetail
	})
}
