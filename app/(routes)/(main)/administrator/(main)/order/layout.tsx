import { Metadata } from 'next'
import { ReactNode } from 'react'
import OrderStateFilter from './OrderStateFilter'
import Block from '@/app/_components/Block'

export const metadata: Metadata = {
	title: 'Order Management',
	description: 'Where admin can view list of orders',
}

export default function OrderListPageLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex-col-start min-h-screen w-full gap-cozy py-comfortable'>
			<Block>
				<div>
					<h1 className='font-semi-bold text-primary-418'>Manage Order</h1>
					<div className='mt-cozy flex items-center justify-between'>
						<OrderStateFilter />
					</div>
					{children}
				</div>
			</Block>
		</div>
	)
}
