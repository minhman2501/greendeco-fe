'use client'
import React from 'react'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { getCookie } from 'cookies-next'
import { useQuery } from '@tanstack/react-query'
import { getOrderListTable } from '@/app/_api/axios/admin/order'
import OrderTable from './OrderTable'
import useQueryParams from '@/app/_hooks/useQueryParams'
import { FilterParams } from '@/app/_api/axios/product'
import { TailSpin } from 'react-loader-spinner'

export default function OrderManagementPage() {
	const { queryObject } = useQueryParams<FilterParams>()

	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
	const orderQuery = useQuery({
		queryKey: [UseQueryKeys.Order, ADMIN_QUERY_KEY, queryObject],
		queryFn: () =>
			getOrderListTable(adminAccessToken, {
				limit: 9999,
				...queryObject,
			}),
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	})
	const { data, isLoading } = orderQuery

	return (
		<div className='py-comfortable'>
			{isLoading && (
				<div className='flex w-full items-center justify-center'>
					<TailSpin
						height='200'
						width='200'
						color='#4fa94d'
						ariaLabel='tail-spin-loading'
						radius='1'
						wrapperStyle={{}}
						wrapperClass=''
						visible={true}
					/>
				</div>
			)}
			{data && data.length > 0 && <OrderTable order={data!} />}
		</div>
	)
}
