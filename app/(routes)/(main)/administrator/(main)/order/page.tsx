'use client'
import { Dropdown } from '@/app/_components/dropdown'
import React from 'react'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { getCookie } from 'cookies-next'
import { useQuery } from '@tanstack/react-query'
import { getOrderListAsAdministrator } from '@/app/_api/axios/admin/order'
import OrderTable from './OrderTable'
import { OrderTableData } from '@/app/_api/axios/admin/order'

export default function OrderManagementPage() {
	const [state, setState] = React.useState('')
	const hanldeOnsubmit = (value: string) => {
		setState(value)
	}

	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
	const orderQuery = useQuery({
		queryKey: [UseQueryKeys.Order, ADMIN_QUERY_KEY],
		queryFn: () => getOrderListAsAdministrator(adminAccessToken), // queryFn: () => getOrder
		refetchOnMount: 'always',
	})

	const { data } = orderQuery
	const dataTable = data?.items.map((value) => {
		var newRow: OrderTableData = {
			owner_info: {
				order_id: value.id,
				user_name: value.user_name,
				userPhoneNumber: value.user_phone_number,
			},
			order_state: {
				order_id: value.id,
				state: value.state,
			},
			...value,
		}

		return newRow
	})

	return (
		<div className='min-h-screen'>
			<h1>Manage Order</h1>
			{data && <OrderTable order={dataTable!} />}
		</div>
	)
}
