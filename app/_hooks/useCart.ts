'use client'

import {
	getCartInfoFromUser,
	getCartItemListFromCartId,
	createNewCart,
	changeCartItemQuantity,
	removeCartItem,
	CartInfoData,
	clearCartItemList,
	addCartItem,
} from '../_api/axios/cart'
import { VariantData, getVariantById } from '../_api/axios/product'
import { getCookie } from 'cookies-next'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { ACCESS_TOKEN_COOKIE_NAME } from '../_configs/constants/cookies'
import { AxiosError } from 'axios'
import { setCookie } from 'cookies-next'
import { AccessTokenType } from '../_types'
import { CartItemData } from '../_api/axios/cart'

export type CartItemWithFullVariantInfo = {
	id: CartItemData['id']
	cart: CartInfoData['id']
	variant: VariantData
	quantity: number
	created_at: string
	updated_at: string
}

export type CartListFullDetail = {
	items: CartItemWithFullVariantInfo[]
	page: number
	page_size: number
	next: Boolean
	prev: Boolean
}

export default function useCart() {
	//NOTE: Handle getCartId - if there isn't any cart -> create new one
	const handleGetCartId = async (accessToken: AccessTokenType) => {
		return await getCartInfoFromUser(accessToken)
			.then((data) => data.items.id)
			.catch((e: AxiosError) => {
				if (e.response?.status === 404) {
					return createNewCart(accessToken).then((data) => data.id)
				}
			})
			.then((data) => data)
	}

	const handleGetCartItemListByCartId = async () => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)
		return await handleGetCartId(accessToken)
			.then((cartId) => {
				if (cartId) {
					setCookie('cartId', cartId)
					return getCartItemListFromCartId(cartId, accessToken)
				}
			})
			.then((data) => {
				if (data) {
					const newList = data.items.map(async (item) => {
						const variant = await getVariantById(item.variant).then((data) => data)
						return {
							...item,
							variant: variant.items,
						}
					})
					return Promise.all(newList).then(
						(cartItemArray: CartItemWithFullVariantInfo[]) => {
							const cartListFullInfo: CartListFullDetail = {
								...data,
								items: cartItemArray,
							}
							return cartListFullInfo
						},
					)
				}
			})
			.then((data) => data)
	}

	const handleGetFullDetailOfCartList = async () => {}

	const queryClient = useQueryClient()

	const cartQuery = useQuery({
		queryKey: ['cart'],
		queryFn: handleGetCartItemListByCartId,
		onError: (e) => console.log(e),
		retry: false,
	})

	const addCartItemMutation = useMutation({
		mutationFn: addCartItem,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
		},
	})

	const changeQuantityMutation = useMutation({
		mutationFn: changeCartItemQuantity,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
		},
	})

	const removeCartItemMutation = useMutation({
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

	const handleAddCartItem = (
		cart_id: CartInfoData['id'],
		quantity: CartItemData['quantity'],
		variant_id: VariantData['id'],
	) => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

		addCartItemMutation.mutate({
			itemData: {
				variant_id: variant_id,
				cart_id: cart_id,
				quantity: quantity,
			},
			accessToken: accessToken,
		})
	}

	const handleIncreaseQuantity = (
		itemId: CartItemData['id'],
		quantity: CartItemData['quantity'],
	) => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

		changeQuantityMutation.mutate({
			itemId: itemId,
			quantity: quantity + 1,
			accessToken: accessToken,
		})
	}

	const handleDecreaseQuantity = (
		itemId: CartItemData['id'],
		quantity: CartItemData['quantity'],
	) => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()
		if (quantity > 1)
			changeQuantityMutation.mutate({
				itemId: itemId,
				quantity: quantity - 1,
				accessToken: accessToken,
			})
	}

	const handleRemoveCartItem = (itemId: CartItemData['id']) => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)
		removeCartItemMutation.mutate({
			itemId: itemId,
			accessToken: accessToken,
		})
	}

	const handleClearCartList = (cartId: string) => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)
		clearCartItemMutation.mutate({
			cartId: cartId,
			accessToken: accessToken,
		})
	}

	return {
		cartQuery: { ...cartQuery },
		addCartItem: handleAddCartItem,
		increaseQuantity: handleIncreaseQuantity,
		decreaseQuantity: handleDecreaseQuantity,
		removeCartItem: handleRemoveCartItem,
		clearCartItemMutation: handleClearCartList,
	}
}
