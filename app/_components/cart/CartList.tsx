import useCart, { CartListFullDetail } from '@/app/_hooks/useCart'
import CartItem from './CartItem'
import Button from '../Button'
import { getCookie } from 'cookies-next'

export default function CartList(props: CartListFullDetail) {
	const { items } = props
	const { clearCartItem } = useCart()

	const handleClearCart = () => {
		const cartId = getCookie('cartId')
		if (cartId) clearCartItem(cartId)
	}

	return (
		<div className='flex-col-start h-full max-h-full gap-compact divide-y divide-primary-5555-60 overflow-hidden'>
			<Button
				onClick={() => handleClearCart()}
				className='w-fit self-end rounded-none border-none bg-transparent p-0 text-body-sm font-medium text-primary-418'
			>
				Clear
			</Button>
			<ul className='flex-col-start h-full max-h-full divide-y divide-primary-5555-20 overflow-y-auto py-cozy '>
				{items.map((item) => (
					<li
						className='py-cozy first:pt-0 last:pb-0'
						key={item.id}
					>
						<CartItem cartItem={{ ...item }} />
					</li>
				))}
			</ul>
		</div>
	)
}
