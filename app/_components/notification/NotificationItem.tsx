import { NotificationData } from '@/app/_api/axios/admin/notification'
import Link from 'next/link'

export function NotificationItem(props: NotificationData) {
	const { message, created_at, title } = props
	return (
		<div className='flex-col-start w-full gap-[4px] p-cozy hover:bg-primary-5555-20/30'>
			<span className='text-body-sm font-bold text-primary-418'>{title}</span>
			<p className='line-clamp-2 text-body-xsm text-primary-418-60'>{message}</p>
			<Link href={''}>View Order</Link>
		</div>
	)
}
