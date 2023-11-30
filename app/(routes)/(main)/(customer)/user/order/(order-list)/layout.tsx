import { ReactNode } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import OrderStateFilterMenu from './OrderStateFilterMenu'

export const metadata: Metadata = {
	title: 'Order Success!',
	description: 'Your order has been placed! Time for payment',
}

export default function UserOrderListPageLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex-col-start w-full gap-cozy'>
			<div className='rounded-[4px] bg-neutral-gray-1 p-cozy shadow-38'>
				<h1 className='font-semi-bold text-primary-418'>Order List</h1>
				<OrderStateFilterMenu />
			</div>
			{children}
		</div>
	)
}
