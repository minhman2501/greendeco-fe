'use client'
import { OrderData, getOrderPrice } from '@/app/_api/axios/order'
import { VARIANT_CURRENCY } from '@/app/_configs/constants/variables'
import { BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
export default function PaymentInformation({ orderId }: { orderId: OrderData['id'] }) {
	const orderPriceQuery = useQuery({
		queryKey: ['order', 'price'],
		queryFn: () => getOrderPrice(orderId),
	})

	const { data } = orderPriceQuery

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
				<span className='text-body-md font-semi-bold'>
					{data?.actual_price} {VARIANT_CURRENCY}
				</span>
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
