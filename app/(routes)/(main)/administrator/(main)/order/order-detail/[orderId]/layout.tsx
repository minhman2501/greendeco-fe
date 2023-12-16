import React from 'react'
import type { Metadata } from 'next'
import Block from '@/app/_components/Block'

export const metadata: Metadata = {
	title: 'Order Detail',
	description: 'Where admin can view list of orders',
}

export default function OrderAdminDetailLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex-col-start w-full gap-cozy py-comfortable'>
			<div>
				<h1 className='font-semi-bold text-primary-418'>Manage Detail</h1>
				{children}
			</div>
		</div>
	)
}
