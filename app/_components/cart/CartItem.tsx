'use client'
import {
	CartItemData,
	changeCartItemQuantity,
	clearCartItemList,
	removeCartItem,
} from '@/app/_api/axios/cart'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { getCookie } from 'cookies-next'
import { useState } from 'react'

export default function CartItem(props: CartItemData) {
	const { variant, quantity, id, cart } = props

	const queryClient = useQueryClient()

	const changeQuantityMutation = useMutation({
		mutationFn: changeCartItemQuantity,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
		},
	})

	const deleteCartItemMutation = useMutation({
		mutationFn: removeCartItem,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
		},
	})

	const clearCartItemMutation = useMutation({
		mutationFn: clearCartItemList,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
		},
	})

	const handleIncreaseQuantity = () => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()
		changeQuantityMutation.mutate({
			itemId: id,
			quantity: quantity + 1,
			accessToken: accessToken,
		})
	}

	const handleDecreaseQuantity = () => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()
		if (quantity > 1)
			changeQuantityMutation.mutate({
				itemId: id,
				quantity: quantity - 1,
				accessToken: accessToken,
			})
	}

	const handleDeleteCartItem = () => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)
		deleteCartItemMutation.mutate({
			itemId: id,
			accessToken: accessToken,
		})
	}

	const handleClearCartList = () => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)
		clearCartItemMutation.mutate({
			cartId: cart,
			accessToken: accessToken,
		})
	}

	return (
		<div className='flex-col-center p-cozy'>
			<span>{variant}</span>
			<div className={clsx('flex items-center gap-cozy ')}>
				<button onClick={() => handleDecreaseQuantity()}>Decrease</button>
				<span>{quantity}</span>
				<button onClick={() => handleIncreaseQuantity()}>Increase</button>
			</div>
			<button onClick={() => handleDeleteCartItem()}>remove item</button>
			<button onClick={() => handleClearCartList()}>Clear</button>
		</div>
	)
}

function QuantityController({
	initialQuantity = 1,
	mutateFn,
}: {
	initialQuantity: number
	mutateFn: UseMutateFunction
}) {
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
