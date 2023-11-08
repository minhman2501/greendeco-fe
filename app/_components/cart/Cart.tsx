'use client'
import useCart from '@/app/_hooks/useCart'
import clsx from 'clsx'
import { CartList as List } from './CartList'
import { CartCalculator as Calculator } from './CartCalculator'
import Button from '../Button'
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid'

export default function Cart() {
	const { cartQuery } = useCart()

	const { isSuccess, data, isLoading } = cartQuery

	return (
		<div className='flex-col-start h-full max-h-full w-[550px] gap-compact overflow-hidden rounded-[8px]  bg-white  shadow-26'>
			<div className='p-comfortable pb-0'>
				<h3 className='mb-[4px] text-heading-1 capitalize text-primary-5555'>Your Cart</h3>
				<p className='text-body-md text-primary-5555-80'>All of your finest choices.</p>
			</div>
			{data && data.page_size > 0 && (
				<>
					<div
						className={clsx('flex-1 overflow-y-auto', {
							'opacity-60': isLoading,
						})}
					>
						<List {...data} />
					</div>
					<div className='p-comfortable pt-cozy'>
						<Calculator {...data} />
					</div>
				</>
			)}
			{data?.page_size === 0 && (
				<div className='flex-col-start h-full justify-end'>
					<NoItemMessage />
				</div>
			)}
		</div>
	)
}

function NoItemMessage() {
	return (
		<div className='p-comfortable'>
			<div className='mb-compact flex items-center gap-comfortable'>
				<span className='flex-1 text-body-sm text-primary-625-80'>
					Seems like there are no items in your cart...
				</span>
			</div>
			<Button className='w-full border-primary-625-40 bg-primary-625-20 font-semi-bold text-primary-625'>
				Continue Shopping
			</Button>
		</div>
	)
}
