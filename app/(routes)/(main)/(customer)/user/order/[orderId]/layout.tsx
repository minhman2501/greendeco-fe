import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Order list',
	description: 'Where you can view your order list',
}

export default function UserOrderListPageLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex-col-start w-full gap-cozy'>
			<div className='rounded-[4px] bg-neutral-gray-1 p-cozy shadow-38'>{children}</div>
		</div>
	)
}
