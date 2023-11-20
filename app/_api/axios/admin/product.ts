import axios from 'axios'

const PRODUCT_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}`
const PLANT_CATEGORY_ID = `${process.env.NEXT_PUBLIC_PLANT_CATEGORY_ID}`

import { ProductData, VariantData } from '../product'

type CreateProductData = Omit<
	ProductData,
	'id' | 'available' | 'created_at' | 'currency' | 'default_variant' | 'price' | 'category'
>
type CreateVariantData = {
	available: boolean
	product_id: string
	name: string
	color: string
	color_name: string
	price: number
	image: string
	description: string
	currency: string
	is_default: boolean
}

type CreateProductRequestData = {
	productData: CreateProductData
	adminAccessToken: string | undefined
}
type CreateVariantRequestData = {
	variantData: CreateVariantData
	adminAccessToken: string | undefined
}

type CreateProductResponseData = {
	id: ProductData['id']
}

export const adminProductApi = axios.create({
	baseURL: PRODUCT_URL,
})

adminProductApi.defaults.headers.common['Content-Type'] = 'application/json'

export const createProduct = async (data: CreateProductRequestData) => {
	const { productData, adminAccessToken } = data

	return await adminProductApi.post<CreateProductResponseData>(
		'/product',
		{
			category_id: PLANT_CATEGORY_ID,
			...productData,
		},
		{
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		},
	)
}

export const createVariant = async (data: CreateVariantRequestData) => {
	const { variantData, adminAccessToken } = data

	return await adminProductApi.post<CreateProductResponseData>(
		'/variant',
		{
			...variantData,
		},
		{
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		},
	)
}
