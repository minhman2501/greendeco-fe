'use client'
import Block from '@/app/_components/Block'
import ProductTable from './ProductTable'
import { useQuery } from '@tanstack/react-query'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { getProductListAsAdministrator } from '@/app/_api/axios/admin/product'
import { getCookie } from 'cookies-next'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'

export default function ProductManagementPage() {
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
	const productQuery = useQuery({
		queryKey: [UseQueryKeys.Product, ADMIN_QUERY_KEY],
		queryFn: () => getProductListAsAdministrator(adminAccessToken),
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
