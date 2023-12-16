import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Order Detail',
	description: 'Where admin can view list of orders',
}

export default function OrderAdminDetailLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex-col-start w-full gap-cozy py-comfortable'>
			<div>{children}</div>
		</div>
	)
}
