'use client'

import { BellIcon } from '@heroicons/react/24/solid'
import { NotificationItem } from '../notification/NotificationItem'
import { useState } from 'react'

export default function NotificationDisplayButton() {
	const handleCartButtonOnClick = () => {
		setOpen(!open)
	}
	const [open, setOpen] = useState(false)

	return (
		<div className='relative'>
			<button
				onClick={handleCartButtonOnClick}
				className='group rounded-xl border-[1px] border-primary-5555-40 bg-primary-5555-20/40 px-[8px] py-[4px] text-primary-625 transition duration-75 ease-in hover:bg-primary-625 hover:text-neutral-gray-1'
			>
				<BellIcon className='aspect-square h-[24px] ' />
			</button>
			{open && (
				<div className='absolute right-0 top-[calc(100%+8px)] max-h-[60vh] w-[24vw] overflow-y-auto rounded-xl bg-white shadow-38 '>
					<div className='bg-primary-625-20/40 p-compact py-compact text-heading-3 font-bold text-primary-5555'>
						Notification
					</div>
					<div className='p-compact'>
						<span className='text-body-sm font-semi-bold text-primary-418-80'>
							Most Recent
						</span>
						<ul className='flex-col-start w-full  '>
							<NotificationItem />
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}

function NotificationAmountDisplay(amount: number | undefined) {
	if (amount && amount > 0)
		return (
			<span className='absolute right-[-4px] top-[-4px] flex aspect-square h-[16px] items-center justify-center rounded-[100%] border-[1px] border-primary-625 bg-primary-625 font-semi-bold text-white transition duration-75  ease-in group-hover:bg-white group-hover:text-primary-625'>
				{amount}
			</span>
		)
}
