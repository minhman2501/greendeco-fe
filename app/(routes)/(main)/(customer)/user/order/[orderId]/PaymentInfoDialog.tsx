import PaymentInformation from '@/app/(routes)/(main)/payment/[orderId]/PaymentInformation'
import { OrderData } from '@/app/_api/axios/order'
import { useDialogStore } from '@/app/_configs/store/useDialogStore'
import { XMarkIcon } from '@heroicons/react/24/solid'

export default function PaymentInfoDialog({ orderId }: { orderId: OrderData['id'] }) {
	const { closeDialog } = useDialogStore()
	return (
		<div className='sticky left-[50%] top-[50%] z-50 w-fit translate-x-[-50%] translate-y-[-50%]'>
			<div className='flex-col-start relative items-center gap-cozy rounded-[16px] bg-primary-625 p-comfortable'>
				<div className=' text-center text-body-md text-neutral-gray-1'>
					<h3>Your Order ID:</h3>
					<p>{orderId}</p>
				</div>
				<PaymentInformation orderId={orderId} />
				<p className=' text-heading-2 font-semi-bold text-neutral-gray-1'>
					Thank you for shopping at GreenDeco <span className='text-[3rem]'>🫶 🥰</span>
				</p>
				<button
					type='button'
					onClick={closeDialog}
					className='absolute right-comfortable top-comfortable text-neutral-gray-1 hover:cursor-pointer'
				>
					<XMarkIcon className='aspect-square h-[24px]' />
				</button>
			</div>
		</div>
	)
}
