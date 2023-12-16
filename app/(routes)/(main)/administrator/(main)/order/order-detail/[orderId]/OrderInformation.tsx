import { OrderFullDetailData } from '@/app/_api/axios/order'

export default function OrderInformationWrapper({ order }: { order: OrderFullDetailData }) {
	return (
		<>
			<div className='flex flex-col text-xl'>
				<div className='flex justify-between text-2xl'>
					<h4>Coupon Infomation:</h4>
				</div>
				<div className='flex justify-between'>
					<p>ID:</p>
					<b>{order.order.coupon_id}</b>
				</div>
				<div className='flex justify-between'>
					<p>Discount:</p>
					<b>{order.order.coupon_discount}%</b>
				</div>
				<div className='flex items-center justify-between  pt-3'>
					<b>Total Price:</b>
					<p>$ {order.price.total}</p>
				</div>
				<div className='flex items-center justify-between pt-5 text-3xl'>
					<b className='text-primary-625-80'>Order Actual Price:</b>
					<b>$ {order.price.actual_price}</b>
				</div>
			</div>
		</>
	)
}
