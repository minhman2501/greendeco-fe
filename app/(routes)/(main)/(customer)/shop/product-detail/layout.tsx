import React from 'react'

export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='w-screen bg-light-green pt-[80px]'>
			<div className='container'>{children}</div>
		</div>
	)
}
