'use client'

import useCartDialog from '@/app/_hooks/dialog/useCartDialog'
import { useCartQuery } from '@/app/_hooks/useCart'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

export default function CartDisplayButton() {
	const router = useRouter()

	const { cartQuery } = useCartQuery()
	const { openCart } = useCartDialog()

	const { isSuccess, isError } = cartQuery

	const handleCartButtonOnClick = () => {
		if (isSuccess) openCart()
		if (isError) router.push('/login')
	}

	return (
		<button
			onClick={handleCartButtonOnClick}
			className='rounded-xl border-[1px] border-primary-5555-40 bg-primary-5555-20/40 px-[8px] py-[4px] text-primary-625 hover:bg-primary-625 hover:text-neutral-gray-1'
		>
			<ShoppingCartIcon className='aspect-square h-[24px] ' />
		</button>
	)
}
