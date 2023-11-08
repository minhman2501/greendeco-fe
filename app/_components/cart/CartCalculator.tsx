import { CartListFullDetail } from '@/app/_hooks/useCart'
import Button from '../Button'

export function CartCalculator({ items }: CartListFullDetail) {
	const currency = items[0].variant.currency
	const totalPrice = items.reduce((accumulator, item) => {
		return accumulator + parseInt(item.variant.price) * item.quantity
	}, 0)
	return (
		<>
			<div className='mb-compact flex items-center gap-comfortable'>
				<span className='flex-1 text-body-sm'>Sub total:</span>
				<span className='text-body-lg font-semi-bold'>
					{totalPrice} {currency}
				</span>
			</div>
			<Button className='w-full'>Check Out</Button>
		</>
	)
}
