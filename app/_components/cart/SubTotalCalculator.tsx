import Button from '../Button'

export default function CartCalculator() {
	return (
		<>
			<div className='mb-compact flex items-center gap-comfortable'>
				<span className='flex-1 text-body-sm'>Sub total:</span>
				<span className='text-body-lg font-semi-bold'>449 USD</span>
			</div>
			<Button className='w-full'>Check Out</Button>
		</>
	)
}
