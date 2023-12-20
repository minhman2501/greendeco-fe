'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
	UserIcon,
	TruckIcon,
	TicketIcon,
	BellIcon,
	HandThumbUpIcon,
} from '@heroicons/react/24/solid'
import clsx from 'clsx'

type UserNavigation = {
	label: string
	path: string
	icon?: React.ReactNode
}

const userNavigationList: UserNavigation[] = [
	{
		path: '/setting/profile',
		label: 'Account Settings',
		icon: <UserIcon className='aspect-square w-[24px]' />,
	},
	{
		path: '/order',
		label: 'Order list',
		icon: <TruckIcon className='aspect-square w-[24px]' />,
	},
	{
		path: '/coupon',
		label: 'Coupon & Voucher',
		icon: <TicketIcon className='aspect-square w-[24px]' />,
	},
	{
		path: '/purchased',
		label: 'Purchased Products',
		icon: <HandThumbUpIcon className='aspect-square w-[24px]' />,
	},
]

export default React.memo(function UserSidebarNavigation() {
	return (
		<div className='flex-col-start sticky top-away-from-header gap-compact rounded-[8px] border-y-[1px] border-l-[1px] border-primary-625-20  bg-white py-comfortable pl-comfortable shadow-38'>
			{userNavigationList.map((nav) => (
				<Navigation
					key={nav.label}
					path={nav.path}
					icon={nav.icon}
					label={nav.label}
				/>
			))}
		</div>
	)
})

const Navigation = React.memo(function Navigation({ label, path, icon }: UserNavigation) {
	const rootPath = '/user'
	const currentPath = usePathname()
	console.log(path, 'render')

	return (
		<Link
			href={rootPath + path}
			className={clsx('flex w-full items-center  gap-compact rounded-l-[8px] p-cozy ', {
				'cursor-pointer text-primary-625 hover:font-semibold':
					currentPath.includes(path) === false,
				'pointer-events-none cursor-auto bg-primary-625 font-bold text-neutral-gray-1':
					currentPath.includes(path),
			})}
		>
			{icon}
			<label className='text-body-sm capitalize'>{label}</label>
		</Link>
	)
})
