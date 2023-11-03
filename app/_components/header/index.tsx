import Button from '../Button'
import Link from 'next/link'
import { motion, useTransform } from 'framer-motion'

export default function Header() {
	return (
		<header className='sticky top-cozy z-20'>
			<div className='container'>
				<div className='mx-[-20px] mt-[-60px] flex h-[60px] items-center gap-cozy'>
					<Logo />
					<NavBar />
					<Button className='h-full px-cozy'>Login</Button>
				</div>
			</div>
		</header>
	)
}

function Logo() {
	return <span className='aspect-square h-full  bg-primary-625'></span>
}

function NavBar() {
	return (
		<div className='flex-col-start h-full flex-1 justify-center border-[1px] border-primary-625 bg-white px-cozy shadow-15'>
			<div className='flex items-center justify-between'>
				<NavigationList />
			</div>
		</div>
	)
}

function NavigationList() {
	return (
		<ul className='flex list-none text-body-sm text-primary-625'>
			<li>
				<Link
					href={'/shop'}
					className='px-cozy text-primary-625'
				>
					Plants
				</Link>
			</li>
			<li>
				<Link
					href={'/'}
					className='px-cozy text-primary-625'
				>
					About Us
				</Link>
			</li>
		</ul>
	)
}
