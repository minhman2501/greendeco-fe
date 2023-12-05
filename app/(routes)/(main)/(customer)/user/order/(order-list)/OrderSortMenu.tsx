'use client'

import { DefaultSortMenu } from '@/app/_components/SortMenu'

export const OrderSortMenu = () => {
	return (
		<div className='flex items-center gap-compact'>
			<span className='text-body-sm font-semi-bold text-primary-418'>Sort By:</span>
			<DefaultSortMenu />
		</div>
	)
}
