import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import PaymentInformation from './PaymentInformation'

export default function PaymentPage({
	params: { orderId },
}: {
	params: {
		orderId: string
	}
}) {
	return (
		<div className='flex-col-start h-full items-center  gap-cozy'>
			<div className='text-center text-neutral-gray-10'>
				<p className='text-body-sm'>Here is your Order ID:</p>
				<p className='text-body-lg font-semi-bold'>{orderId}</p>
			</div>
			<div className='flex  gap-comfortable'>
				<ThankYouMessage />
				<PaymentInformation orderId={orderId} />
			</div>
		</div>
	)
}

const ThankYouMessage = () => {
	return (
		<div className='flex-col-start h-full  justify-between  '>
			<p className=' text-heading font-bold text-primary-625'>
				Thank you for shopping at GreenDeco 🫶
			</p>
			<div className='flex-col-start gap-[4px] text-center text-neutral-gray-10'>
				<p className=' text-body-sm'>
					You can proceed to pay now or later in your order list
				</p>
				<p className='text-body-sm'>
					Please complete the payment within{' '}
					<span className='font-bold text-status-success'>10 days</span> or this order
					will be <span className='font-bold text-status-error'>cancelled</span>
				</p>
				<p className='mb-[4px] text-body-sm'>
					Your order will be updated within 24 hours after we recieved your money.
				</p>
			</div>
			<div className='w-full text-center'>
				<p className='mb-compact text-body-md text-neutral-gray-10'>Proceed to?</p>
				<div className='flex w-full gap-cozy'>
					<Link
						href={'/'}
						className='btn flex-1'
					>
						<span className='flex items-center justify-center gap-compact font-semi-bold'>
							<ArrowLeftIcon className='aspect-square h-[24px]' />
							Back to shopping
						</span>
					</Link>
					<Link
						className='btn btnSecondary flex-1'
						href={'/'}
					>
						<span className='flex items-center justify-center gap-compact font-semi-bold'>
							View Order List
							<ArrowRightIcon className='aspect-square h-[24px]' />
						</span>
					</Link>
				</div>
			</div>
		</div>
	)
}
