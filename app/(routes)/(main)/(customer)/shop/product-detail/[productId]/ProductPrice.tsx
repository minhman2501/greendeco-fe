import Button from '@/app/_components/Button'
import QuantityController from '@/app/_components/QuantityController'
import { useVariantStore } from '@/app/_configs/store/useVariantStore'
import useCart from '@/app/_hooks/useCart'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { getCookie } from 'cookies-next'
export default function Price() {
	const { price, currency, id } = useVariantStore((state) => state.activeVariant)

	const { addCartItem } = useCart()

	const handleAddCartItem = () => {
		const cartId = getCookie('cartId')?.toString()

		if (cartId) {
			addCartItem(cartId, 1, id)
		}
	}

	return (
		<div className='flex items-center justify-between rounded-[8px] bg-primary-625 px-comfortable py-cozy'>
			<span className='text-[3rem] font-semi-bold text-white'>{`${price} ${currency}`}</span>
			<div>
				<Button className='btnSecondary flex items-center gap-[4px]'>
					<span
						className='font-semi-bold'
						onClick={() => handleAddCartItem()}
					>
						Add to cart
					</span>
					<ShoppingCartIcon className='aspect-square w-[24px]' />
				</Button>
			</div>
		</div>
	)
}
