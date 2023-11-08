'use client'
import useCart from '@/app/_hooks/useCart'
import clsx from 'clsx'
import CartItem from './CartItem'
import { getVariantById } from '@/app/_api/axios/product'
import CartList from './CartList'
import CartCalculator from './SubTotalCalculator'

export default function Cart() {
	const { cartQuery } = useCart()

	const { isSuccess, data, isLoading } = cartQuery

	return (
		<div className='flex-col-start h-full max-h-full w-[550px] gap-compact overflow-hidden rounded-[8px]  bg-white  shadow-26'>
			<div className='p-comfortable pb-0'>
				<h3 className='mb-[4px] text-heading-1 capitalize text-primary-5555'>Your Cart</h3>
				<p className='text-body-md text-primary-5555-80'>All of your finest choices.</p>
			</div>
			<div
				className={clsx('flex-1 overflow-y-auto', {
					'opacity-60': isLoading,
				})}
			>
				{data && <CartList {...data} />}
			</div>
			<div className='p-comfortable pt-cozy'>
				<CartCalculator />
			</div>
		</div>
	)
}
