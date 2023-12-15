import { NotificationData } from '@/app/_api/axios/admin/notification'
import { USER_SETTING_ROUTE } from '@/app/_configs/constants/variables'
import formatDate from '@/app/_hooks/useFormatDate'
import Link from 'next/link'

export function NotificationItem(props: NotificationData) {
	const { message, created_at, title, description } = props
	return (
		<div className='flex-col-start w-full gap-compact p-cozy hover:bg-primary-5555-20/30'>
			<div>
				<span className='mb-[4px] text-body-sm font-bold text-primary-418'>{title}</span>
				<p className='line-clamp-2 text-body-xsm text-primary-418-60'>{message}</p>
			</div>
			<div className='flex items-end justify-between'>
				<p className='text-body-xsm font-semi-bold text-primary-5555-80'>
					{formatDate(new Date(created_at))}
				</p>
				<Link
					className='w-fit text-body-xsm '
					href={`${USER_SETTING_ROUTE.ORDER.LINK}/${description}`}
				>
					View Order
				</Link>
			</div>
		</div>
	)
}
