type PickUpdateModalType = {
	onCancel: () => void
	onSubmit: (value: any) => void
	orderId: string
}

export default function PickUpDateModal({ onCancel }: PickUpdateModalType) {
	return (
		<div className='absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center bg-primary-418/40'>
			<div className='z-10 rounded-3xl border border-order-status-processing bg-neutral-gray-1'></div>
			<div className='flex h-[79px] flex-col items-center justify-center rounded-t-3xl bg-order-status-cancelled text-center text-white'>
				<h1 className='text-2xl uppercase'>Updating to processing</h1>
				<p className='pt-1 text-xl'>
					Enter the customer payment date to complete the process
				</p>
			</div>
		</div>
	)
}
