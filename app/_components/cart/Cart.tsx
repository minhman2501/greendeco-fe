'use client'
import useCart from '@/app/_hooks/useCart'
import clsx from 'clsx'
import CartItem from './CartItem'
import { getVariantById } from '@/app/_api/axios/product'

export default function Cart() {
	const { cartQuery } = useCart()

	const { isSuccess, data, isLoading } = cartQuery

	return (
		<div
			className={clsx({
				'opacity-70': isLoading,
			})}
		>
			<div>Cart</div>
			{data && (
				<div>
					{data.items.map((item, index) => (
						<>
							<CartItem
								key={item.id}
								cartItem={{ ...item }}
							/>
						</>
					))}
				</div>
			)}
		</div>
	)
}
