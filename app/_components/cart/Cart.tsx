'use client'
import useCart from '@/app/_hooks/useCart'
import clsx from 'clsx'
import CartItem from './CartItem'
import { getVariantById } from '@/app/_api/axios/product'
import CartList from './CartList'

export default function Cart() {
	const { cartQuery } = useCart()

	const { isSuccess, data, isLoading } = cartQuery

	return (
		<div className='h-full max-h-full w-[550px] overflow-hidden rounded-[8px]  bg-white p-comfortable shadow-26'>
			<div>
				<h3 className='mb-[4px] text-heading-1 capitalize text-primary-5555'>Your Cart</h3>
				<p className='text-body-md text-primary-5555-80'>All of your finest choices.</p>
			</div>
			{data && <CartList {...data} />}
		</div>
	)
}
