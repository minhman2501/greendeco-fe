import { ReactNode } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Order Success!',
	description: 'Your order has been placed! Time for payment',
}

export default function UserOrderListPageLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex-col-start w-full gap-cozy'>
			<div className='rounded-[4px] bg-neutral-gray-1 p-cozy shadow-38'>
				<h1 className='font-semi-bold text-primary-418'>Order List</h1>
				<div className='flex items-center gap-cozy'>
					<Link
						href={{
							pathname: '',
							query: {
								field: null,
							},
						}}
						className=' w-fit px-comfortable py-compact'
					>
						All
					</Link>
					<Link
						href={{
							pathname: '',
							query: {
								field: '{"state":"draft"}',
							},
						}}
						className=' w-fit px-comfortable py-compact'
					>
						Draft
					</Link>
					<Link
						href={{
							pathname: '',
							query: {
								field: '{"state":"processing"}',
							},
						}}
						className=' w-fit px-comfortable py-compact'
					>
						Proccesing
					</Link>
					<Link
						href={{
							pathname: '',
							query: {
								field: '{"state":"completed"}',
							},
						}}
						className=' w-fit px-comfortable py-compact'
					>
						Completed
					</Link>
					<Link
						href={{
							pathname: '',
							query: {
								field: '{"state":"cancelled"}',
							},
						}}
						className=' w-fit px-comfortable py-compact'
					>
						Cancelled
					</Link>
				</div>
			</div>
			{children}
		</div>
	)
}
