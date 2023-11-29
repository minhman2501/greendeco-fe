import {
	ArrowLeftIcon,
	ArrowRightIcon,
	BanknotesIcon,
	CreditCardIcon,
} from '@heroicons/react/24/solid'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

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
				<PaymentInformation />
			</div>
		</div>
	)
}

const PaymentInformation = () => {
	return (
		<div className='flex-col-start w-[500px] divide-y divide-primary-625 rounded-[8px] border-[2px] border-primary-625 bg-neutral-gray-1 px-comfortable py-cozy text-neutral-gray-10 shadow-15'>
			<div className='flex items-center justify-between py-cozy'>
				<CreditCardIcon className='aspect-square h-[24px] text-primary-5555' />
				<div className='flex-col-start items-end gap-compact'>
					<p className='text-body-xsm '>
						Account number:{' '}
						<span className='text-body-md font-semi-bold'>12345678</span>
					</p>
					<p className='text-body-xsm '>
						Account owner name:{' '}
						<span className='text-body-md font-semi-bold'>Nguyen Khai Tri</span>
					</p>
					<p className='text-body-xsm '>
						Bank: <span className='text-body-md font-semi-bold'>BIDV DONG SAI GON</span>
					</p>
				</div>
			</div>
			<div className='flex items-center justify-between py-cozy'>
				<BanknotesIcon className='aspect-square h-[24px] text-primary-5555' />
				<span className='text-body-md font-semi-bold'>123 USD</span>
			</div>
			<div className='flex items-center justify-between py-cozy'>
				<p className='text-body-xsm font-semi-bold text-primary-5555'>
					Transaction Content:
				</p>
				<span className='text-body-md font-semi-bold'>Full Name + Order ID</span>
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
