import Link from 'next/link'
import ShippingDetailForm from './ShippingDetailForm'
import OrderItemList from './OrderList'
import Image from 'next/image'
import BrandLogoFullGreen from '@/public/BrandLogoFullGreen.svg'

export default function CheckoutPage() {
	return (
		<main className='h-screen max-h-screen w-screen bg-primary-418-20/20'>
			<div className='container h-full'>
				<div className='grid h-full grid-cols-6 gap-comfortable'>
					<div className='flex-col-start col-span-4 gap-cozy'>
						<Header></Header>
						<ShippingDetailForm />
					</div>

					<OrderItemList />
				</div>
			</div>
		</main>
	)
}

const Header = () => {
	return (
		<div className='mt-comfortable flex items-center justify-between '>
			<div className='flex items-center divide-x divide-primary-625'>
				<Logo />
				<h1 className='pl-compact font-semi-bold text-primary-625'>Checkout</h1>
			</div>
			<Link
				className='text-body-xsm'
				href={'/shop'}
			>
				Continue Shopping
			</Link>
		</div>
	)
}

function Logo() {
	return (
		<Link
			href={'/'}
			className='h-full pr-compact'
		>
			<div className='relative inline-block h-[60px] w-[180px] overflow-hidden'>
				<Image
					src={BrandLogoFullGreen}
					alt='Welcome to GreenDeco'
					fill
					style={{ objectFit: 'contain' }}
				/>
			</div>
		</Link>
	)
}
