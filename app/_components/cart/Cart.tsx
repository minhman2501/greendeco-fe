'use client'
import { useCartQuery } from '@/app/_hooks/useCart'
import { CartList as List } from './CartList'
import { CartCalculator as Calculator } from './CartCalculator'
import { useDialogStore } from '@/app/_configs/store/useDialogStore'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

export default function Cart() {
	const { cartQuery } = useCartQuery()

	const { closeDialog } = useDialogStore()

	const { data } = cartQuery

	return (
		<div className='flex-col-start h-full max-h-full w-[550px] gap-compact overflow-hidden rounded-[8px]  bg-white  shadow-26'>
			<div className=' p-comfortable pb-0'>
				<div className='flex'>
					<h3 className='mb-[4px] flex-1 text-heading-1 capitalize text-primary-5555'>
						Your Cart
					</h3>
					<span
						onClick={() => closeDialog()}
						className='flex cursor-pointer items-center gap-compact text-body-xsm text-primary-5555-60 hover:text-primary-5555'
					>
						Continue Shopping{' '}
						<ArrowRightIcon className='aspect-square h-[14px] translate-y-[1px]' />
					</span>
				</div>
				<p className='text-body-md text-primary-5555-80'>All of your finest choices.</p>
			</div>
			{data && data.page_size > 0 && (
				<>
					<div className='flex-1 overflow-y-auto'>
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
		</div>
	)
}
