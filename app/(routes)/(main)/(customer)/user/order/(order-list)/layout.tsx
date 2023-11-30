import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import Block from '@/app/_components/Block'

export const metadata: Metadata = {
	title: 'Order Success!',
	description: 'Your order has been placed! Time for payment',
}

export default function UserOrderListPageLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex-col-start w-full gap-cozy'>
			<Block>
				<h1>Order History Page</h1>
			</Block>
			{children}
		</div>
	)
}
