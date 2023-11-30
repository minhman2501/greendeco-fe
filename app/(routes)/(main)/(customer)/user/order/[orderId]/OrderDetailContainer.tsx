import { OrderData } from '@/app/_api/axios/order'
import formatDate from '@/app/_hooks/useFormatDate'
import { UserCircleIcon, EnvelopeIcon, PhoneIcon, TruckIcon } from '@heroicons/react/24/solid'

export default function OrderDetailContainer({ order }: { order: OrderData }) {
	return (
		<>
			<div className='grid grid-cols-3 gap-cozy'>
				<div className='col-span-2'>
					<OrderDetail {...order} />
				</div>
				<div>
					<CustomerAndShippingDetail {...order} />
				</div>
			</div>
		</>
	)
}

function OrderDetail({ id, created_at, state, paid_at }: OrderData) {
	return (
		<div className='flex-col-start divide-y divide-primary-625-60 '>
			<h2 className='py-compact text-body-lg font-semi-bold'>Order Info</h2>
			<div className='flex gap-compact p-cozy'>
				<div className='flex-col-start gap-[4px]  text-body-sm font-semi-bold'>
					<span>ID:</span>
					<span>Date Created:</span>
					<span>Order Status:</span>
					<span>Payment Status:</span>
				</div>
				<div className='flex-col-start gap-[4px]  text-body-sm'>
					<span>{id}</span>
					<span>{formatDate(new Date(created_at))}</span>
					<span>{state}</span>
					<span>{paid_at ? 'Paid' : 'Waiting For Payment'}</span>
				</div>
			</div>
		</div>
	)
}

function CustomerAndShippingDetail({
	user_name,
	user_phone_number,
	user_email,
	shipping_address,
}: OrderData) {
	return (
		<div className='flex-col-start  divide-y divide-primary-418-60 rounded-[8px] border-[2px] border-primary-625-60 p-cozy shadow-18'>
			<div className='flex-col-start gap-[4px] pb-cozy text-body-sm '>
				<h2 className='mb-[4px] text-body-lg font-semi-bold'>Customer</h2>
				<span className='flex items-center gap-compact'>
					<UserCircleIcon className='aspect-square h-[20px]' />
					{user_name}
				</span>
				<span className='flex items-center gap-compact'>
					<EnvelopeIcon className='aspect-square h-[20px]' />
					{user_email}
				</span>
				<span className='flex items-center gap-compact'>
					<PhoneIcon className='aspect-square h-[20px]' />
					{user_phone_number}
				</span>
			</div>
			<div className='flex-col-start gap-[4px] pt-cozy text-body-sm '>
				<div className='flex items-center gap-compact '>
					<TruckIcon className='aspect-square h-[20px]' />
					<h2 className=' text-body-lg font-semi-bold'>Shipping Address</h2>
				</div>
				<span className='flex items-center gap-compact'>{shipping_address}</span>
			</div>
		</div>
	)
}
