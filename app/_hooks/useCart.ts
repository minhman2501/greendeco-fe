'use client'

import {
	getCartInfoFromUser,
	getCartItemListFromCartId,
	createNewCart,
	changeCartItemQuantity,
	removeCartItem,
	clearCartItemList,
	addCartItem,
} from '../_api/axios/cart'
import { getCookie } from 'cookies-next'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { ACCESS_TOKEN_COOKIE_NAME } from '../_configs/constants/cookies'
import { AxiosError } from 'axios'
import { setCookie } from 'cookies-next'
import { AccessTokenType } from '../_types'

export const handleGetCartId = async (accessToken: AccessTokenType) => {
	return await getCartInfoFromUser(accessToken)
		.then((data) => data.items.id)
		.catch((e: AxiosError) => {
			if (e.response?.status === 404) {
				return createNewCart(accessToken).then((data) => data.id)
			}
		})
		.then((data) => data)
}

export const handleGetCartItemListByCartId = async () => {
	const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)
	const cartId = await handleGetCartId(accessToken).then((data) => data)
	if (cartId) {
		//NOTE: Save the cartId for further features like change item quantity, add new items...
		setCookie('cartId', cartId)
		return getCartItemListFromCartId(cartId, accessToken).then((data) => data)
	}
}

export default function useCart() {
	const queryClient = useQueryClient()

	const cartQuery = useQuery({
		queryKey: ['cart'],
		queryFn: handleGetCartItemListByCartId,
		onError: (e) => console.log(e),
		retry: false,
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

	const addCartItemMutation = useMutation({
		mutationFn: addCartItem,
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

	return {
		cartQuery: cartQuery,
		addCartItemMutation: addCartItemMutation,
		changeQuantityMutation: changeQuantityMutation,
		removeCartItemMutation: removeCartItemMutation,
		clearCartItemMutation: clearCartItemMutation,
	}
}
