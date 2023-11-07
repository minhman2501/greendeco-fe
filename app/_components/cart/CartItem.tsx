'use client'

import { CartItemData } from '@/app/_api/axios/cart'
import useCart from '@/app/_hooks/useCart'
import clsx from 'clsx'
import { useState } from 'react'

export default function CartItem(props: CartItemData) {
	const { variant, quantity, id } = props

	const { increaseQuantity, decreaseQuantity } = useCart()

	return (
		<div className='flex-col-center p-cozy'>
			<span>{variant}</span>
			<div className={clsx('flex items-center gap-cozy ')}>
				<button onClick={() => decreaseQuantity(id, quantity)}>Decrease</button>
				<span>{quantity}</span>
				<button onClick={() => increaseQuantity(id, quantity)}>Increase</button>
			</div>
		</div>
	)
}

function QuantityController({ initialQuantity = 1 }: { initialQuantity: number }) {
	const [quantity, setQuantity] = useState<number>(initialQuantity)

	return (
		<div className='flex items-center gap-cozy'>
			<button
				onClick={() => {
					if (quantity > 1) setQuantity((prev) => prev - 1)
				}}
			>
				Decrease
			</button>
			<span>{quantity}</span>
			<button onClick={() => setQuantity((prev) => prev + 1)}>Increase</button>
		</div>
	)
}
