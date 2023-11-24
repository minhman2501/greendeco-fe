'use client'
import Block from '@/app/_components/Block'
import ProductTable from './ProductTable'
import { useQuery } from '@tanstack/react-query'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { getProductListAsAdministrator } from '@/app/_api/axios/admin/product'
import { getCookie } from 'cookies-next'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import Button from '@/app/_components/Button'
import { useRouter } from 'next/navigation'
import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'
import { PlusCircleIcon } from '@heroicons/react/24/solid'

export default function ProductManagementPage() {
	const router = useRouter()
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
	const productQuery = useQuery({
		queryKey: [UseQueryKeys.Product, ADMIN_QUERY_KEY],
		queryFn: () => getProductListAsAdministrator(adminAccessToken),
	})

	const { data } = productQuery
	return (
		<div className='min-h-screen py-comfortable'>
			<Block>
				<div className='mb-cozy flex items-center justify-between'>
					<h1>Manage Product</h1>
					<Button
						className='flex items-center gap-compact'
						onClick={() => router.push(`${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/create`)}
					>
						Create
						<PlusCircleIcon className='aspect-square h-[24px]' />
					</Button>
				</div>
				{data && <ProductTable product={data.items} />}
			</Block>
		</div>
	)
}
