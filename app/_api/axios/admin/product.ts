import axios from 'axios'

const PRODUCT_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}`
const PLANT_CATEGORY_ID = `${process.env.PLANT_CATEGORY_ID}`

import { ProductData, VariantData } from '../product'
import { headers } from 'next/dist/client/components/headers'

type CreateProductData = Omit<
	ProductData,
	'id' | 'available' | 'created_at' | 'currency' | 'default_variant' | 'price' | 'category'
>

type CreateProductRequestData = {
	productData: CreateProductData
	adminAccessToken: string | undefined
}

type CreateProductResponseData = {
	productId: ProductData['id']
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
