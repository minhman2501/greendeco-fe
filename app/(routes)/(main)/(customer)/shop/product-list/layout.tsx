import React from 'react'
import { SortMenu } from './ProductSortMenu'
import FilterMenu from './ProductFilter'

export default function ProductListLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div>Banner</div>
			<div className='grid grid-cols-12 gap-comfortable'>
				<div className='col-span-3'>
					<SortMenu />
					<FilterMenu />
				</div>
				<div className='col-span-9'>{children}</div>
			</div>
		</>
	)
}
