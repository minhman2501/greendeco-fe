import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Purchased Products',
	description: 'Where you can view your purchased product and leave a review if you want',
}

export default function UserPurchasedProductPageLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex-col-start w-full gap-cozy'>
			<div className='rounded-[4px] bg-neutral-gray-1 p-cozy shadow-38'>
				<div className='flex-col-start gap-compact'>
					<h1 className='font-semi-bold text-primary-418'>Reviews</h1>
					<p>You can leave comments to express your feelings about our beloved plants.</p>
				</div>
			</div>
			{children}
		</div>
	)
}
