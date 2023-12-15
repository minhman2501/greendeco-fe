import { NotificationData } from '@/app/_api/axios/admin/notification'
import Link from 'next/link'

export function NotificationItem(/* props: NotificationData */) {
	return (
		<div className='flex-col-start w-full gap-[4px] p-cozy hover:bg-primary-5555-20/30'>
			<span className='text-body-sm font-bold text-primary-418'>
				Your Order Has Been Updated
			</span>
			<p className='line-clamp-2 text-body-xsm text-primary-418-60'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor dolorem ducimus
				accusamus expedita labore dignissimos quis obcaecati doloremque aut eius.
			</p>
			<Link href={''}>View Order</Link>
		</div>
	)
}
