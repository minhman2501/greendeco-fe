import Button from '@/app/_components/Button'
import { MultilineTextField, TextField } from '@/app/_components/form'
import { UseFormRegisterReturn } from 'react-hook-form'

type CancelModalType = {
	onCancel: () => void
	onSubmit: (value: any) => void
	orderId: string
	register?: UseFormRegisterReturn
	error: boolean
	helperText?: string
}

export default function CancelModal({
	onCancel,
	onSubmit,
	register,
	error,
	orderId,
	helperText,
}: CancelModalType) {
	return (
		<div className='absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center bg-primary-418/40'>
			<div className='z-10 rounded-3xl border border-order-status-cancelled bg-neutral-gray-1'>
				<div className='flex h-[79px] flex-col items-center justify-center rounded-t-3xl bg-order-status-cancelled text-center text-white'>
					<h1 className='text-2xl uppercase'>Cancelling order confirmation</h1>
					<p className='pt-1 text-xl'>Enter the reason to cancel this order</p>
				</div>
				<form
					onSubmit={onSubmit}
					className='flex flex-col justify-center p-8 text-2xl'
				>
					<div className='m-3'>
						<p className='font-bold'>Order ID:</p>
						<p className=''>{orderId}</p>
					</div>
					<MultilineTextField
						type='text'
						label='Reason: '
						placeholder='Order Cancel Reason'
						register={register}
						error={error}
						helperText={helperText}
						className='m-2.5 h-[145px]'
					/>
					<div className='flex justify-end'>
						<Button
							className='m-2.5 w-36 border-0 bg-order-status-cancelled text-center text-xl'
							type='submit'
							onClick={onSubmit}
						>
							Confirm
						</Button>
						<Button
							className='m-2.5  w-36 border-order-status-cancelled bg-neutral-gray-1 text-xl text-order-status-cancelled'
							onClick={onCancel}
						>
							Cancel
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
