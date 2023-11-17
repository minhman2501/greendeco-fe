'use client'

import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'
import { useDialogStore } from '@/app/_configs/store/useDialogStore'
import useActivePath from '@/app/_hooks/useActivePath'
import { XMarkIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdministratorSidebar() {
	const { closeDialog } = useDialogStore()
	return (
		<div className='sticky left-0 top-0  h-full max-h-screen w-[300px]  bg-primary-625 p-comfortable pr-0'>
			<div className='relative flex h-full w-full items-center'>
				<span
					onClick={() => closeDialog()}
					className='absolute left-0 top-0  flex items-center gap-compact self-start text-body-sm text-neutral-gray-1 hover:cursor-pointer'
				>
					<XMarkIcon className='aspect-square h-[20px]' />
					Close
				</span>
				<NavigationList />
			</div>
		</div>
	)
}

function NavigationList() {
	const { isPathActive } = useActivePath()
	return (
		<ul className='flex-col-start w-full gap-compact'>
			<NavItem
				href={ADMINISTRATOR_ROUTE.PRODUCT}
				active={isPathActive(ADMINISTRATOR_ROUTE.PRODUCT)}
			>
				Product Management
			</NavItem>
			<NavItem
				href={ADMINISTRATOR_ROUTE.ORDER}
				active={isPathActive(ADMINISTRATOR_ROUTE.ORDER)}
			>
				Order Management
			</NavItem>
		</ul>
	)
}

function NavItem({
	href,
	active,
	children,
}: {
	href: string
	children: ReactNode
	active: Boolean
}) {
	const { closeDialog } = useDialogStore()
	return (
		<li
			onClick={closeDialog}
			className={clsx(
				' rounded-l-[8px] text-body-md font-semi-bold text-white hover:bg-neutral-gray-1/20',
				{
					'pointer-events-none bg-neutral-gray-1': active,
				},
			)}
		>
			<Link
				href={href}
				className={clsx('block px-comfortable py-cozy capitalize', {
					'font-bold text-primary-625': active,
					'text-white': !active,
				})}
			>
				{children}
			</Link>
		</li>
	)
}
