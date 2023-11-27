import Link from 'next/link'
import ShippingDetailForm from './ShippingDetailForm'
export default function CheckoutPage() {
	return (
		<main className='h-screen max-h-screen w-screen'>
			<div className='container h-full'>
				<div className='grid h-full grid-cols-6 gap-comfortable'>
					<div className='flex-col-start col-span-4 gap-cozy'>
						<Header></Header>
						<ShippingDetailForm />
					</div>
				</div>
			</div>
		</main>
	)
}

const Header = () => {
	return (
		<div className='mt-comfortable flex justify-between p-compact'>
			<div>
				<Logo />
				<h1>Checkout</h1>
			</div>
			<Link
				className=''
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
			className=''
		>
			GreenDeco
		</Link>
	)
}
