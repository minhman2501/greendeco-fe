import Button from '@/app/_components/Button'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
export default function Price() {
	return (
		<div className='flex items-center justify-between rounded-[8px] bg-primary-625 px-comfortable py-cozy'>
			<span className='text-[3rem] font-semi-bold text-white'>$65</span>
			<Button className='btnSecondary flex items-center gap-[4px]'>
				<span>Add to cart</span>
				<ShoppingCartIcon className='aspect-square w-[24px]' />
			</Button>
		</div>
	)
}
