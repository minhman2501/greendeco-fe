import Button from '@/app/_components/Button'
import Image from 'next/image'
import BrandLogoFullGreen from '@/public/BrandLogoFullGreen.svg'
import Link from 'next/link'
import { ArrowLeftOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/solid'

export const AdministratorHeader = () => {
	return (
		<header className=''>
			<div className='relative flex h-[60px] w-full items-center justify-between bg-neutral-gray-1 pr-comfortable shadow-63'>
				<SideBarButton />
				<Logo />
				<LogoutButton />
			</div>
		</header>
	)
}

function SideBarButton() {
	return (
		<Button className='flex h-full items-center gap-cozy rounded-none border-none bg-primary-580-20 p-cozy text-body-lg text-primary-625'>
			<Bars3Icon className='aspect-square h-[20px]' />
			SideBar
		</Button>
	)
}

function Logo() {
	return (
		<span className='absolute inset-y-0 left-[50%] translate-x-[-50%]  '>
			<Link
				href={'/'}
				className='relative inline-block h-full w-[180px]  overflow-hidden  '
			>
				<Image
					src={BrandLogoFullGreen}
					alt='Welcome to GreenDeco'
					width={0}
					height={0}
					sizes='100vw'
				/>
			</Link>
		</span>
	)
}

function LogoutButton() {
	return (
		<span className='rounded-[100%] border-[1px] border-neutral-gray-5 bg-neutral-gray-3 p-compact'>
			<ArrowLeftOnRectangleIcon className='aspect-square h-[24px] text-black' />
		</span>
	)
}
