'use client'
import Block from '@/app/_components/Block'
import ProductTable from './ProductTable'
import { useQuery } from '@tanstack/react-query'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { getProductList } from '@/app/_api/axios/product'
import { getProductListAsAdministrator } from '@/app/_api/axios/admin/product'

export default function ProductManagementPage() {
	const productQuery = useQuery({
		queryKey: [UseQueryKeys.Product, ADMIN_QUERY_KEY],
		queryFn: () =>
			getProductListAsAdministrator(
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNzAwNzU1NTAyLCJ1c2VyX2lkIjoiM2NkNDZhOTUtNWFhYi00MTk1LTkzNTgtMzg1YWQ5YTMyZGU5In0.AoDIvWGyCkhRURd7zPB0pNA6M4o7rvgsIyd1_tVKSh4',
			),
	})

	const { data } = productQuery
	return (
		<div className='min-h-screen py-comfortable'>
			<Block>
				<h1>Manage Product</h1>
				{data && <ProductTable product={data.items} />}
			</Block>
		</div>
	)
}
