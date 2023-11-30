import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import Block from '@/app/_components/Block'

export const metadata: Metadata = {
	title: 'Order Success!',
	description: 'Your order has been placed! Time for payment',
}

export default function UserOrderList({ children }: { children: ReactNode }) {
	return (
		<Block>
			<h1>Order History Page</h1>
			{children}
		</Block>
	)
}
