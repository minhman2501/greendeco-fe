import Link from 'next/link'
import ShippingDetailForm from './ShippingDetailForm'
import OrderItemList from './OrderList'
import Image from 'next/image'
import BrandLogoFullGreen from '@/public/BrandLogoFullGreen.svg'

export default function CheckoutPage() {
	return (
		<main className='h-screen max-h-screen w-screen overflow-y-hidden bg-primary-418-20/20'>
			<div className='container h-full'>
				<div className='grid h-full max-h-full grid-cols-12 '>
					<div className='flex-col-start col-span-7 gap-cozy pt-comfortable'>
						<Header />
						<ShippingDetailForm />
					</div>

					<div className='col-span-5 h-full max-h-screen overflow-y-hidden p-comfortable '>
						<OrderItemList />
					</div>
				</div>
			</div>
		</main>
	)
}

const Header = () => {
	return (
		<div className=' flex items-center justify-between '>
			<div className='flex items-center divide-x divide-primary-625'>
				<Logo />
				<h1 className='pl-compact font-semi-bold text-primary-625'>Checkout</h1>
			</div>
			<Link
				className='text-body-xsm'
				href={'/shop'}
				replace
				scroll
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
			replace
			scroll
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
