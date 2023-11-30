import { OrderData, OrderListData } from '@/app/_api/axios/order'

export default function UserOrderList({ orderList }: { orderList: OrderListData['items'] }) {
	return (
		<ul className='flex-col-start w-full gap-cozy'>
			{orderList.map((order) => (
				<li key={order.id}>
					<OrderItem order={order} />
				</li>
			))}
		</ul>
	)
}

const OrderItem = ({ order }: { order: OrderData }) => {
	return (
		<div className='flex-col-start w-full gap-compact rounded-[4px] bg-neutral-gray-1 p-cozy shadow-38'>
			<div className='flex items-center justify-between'>
				<span>
					Order: <span>{order.id}</span>
				</span>
				<span>{order.state}</span>
			</div>
			<div className='flex justify-end'>
				<span>Detai</span>
			</div>
		</div>
	)
}
