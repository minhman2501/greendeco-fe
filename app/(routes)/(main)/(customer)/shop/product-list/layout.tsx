import React from 'react'

export default function ProductListLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div>Banner</div>
			<div className='grid grid-cols-12 gap-comfortable'>
				<div className='col-span-4'>Filter</div>
				<div className='col-span-8'>{children}</div>
			</div>
		</>
	)
}
