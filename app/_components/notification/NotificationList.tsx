import { NotificationListResponseData } from '@/app/_api/axios/notification'
import { NotificationItem as Item } from './NotificationItem'

export default function NotificationList(props: NotificationListResponseData) {
	const { items, page_size } = props
	return (
		<>
			{items && page_size > 0 && (
				<div className='absolute right-0 top-[calc(100%+8px)] max-h-[60vh] w-[24vw] overflow-y-auto rounded-xl bg-white shadow-38 '>
					<div className='bg-primary-625-20/40 p-compact py-compact text-heading-3 font-bold text-primary-5555'>
						Notification
					</div>
					<div className='p-compact'>
						<span className='text-body-sm font-semi-bold text-primary-418-80'>
							Most Recent
						</span>
						<ul className='flex-col-start w-full  '>
							{items.map((item) => (
								<li key={item.id}>
									<Item {...item} />
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</>
	)
}
