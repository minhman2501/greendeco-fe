import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

export default function ProductCard() {
	return (
		<span className='w-full overflow-hidden rounded-[16px] shadow-63'>
			<CardImage />
			<div className='flex w-full p-cozy'>
				<CardDetail />
				<span className='flex items-center justify-center'>
					<AddToCartButton />
				</span>
			</div>
		</span>
	)
}

function CardDetail() {
	return (
		<div className='flex-col-start h-full w-full justify-between gap-cozy'>
			<div className='flex-col-start'>
				<span className='cursor-pointer text-body-sm font-semibold text-primary-625 hover:underline'>
					Cat Palm
				</span>
				<span className='flex items-center gap-[2px]'>
					<StarIcon
						className='aspect-square h-[20px]'
						color='#FF8B28'
					/>
					<span className='text-body-xsm text-primary-418-60'>4.7 (15 reviews)</span>
				</span>
			</div>
			<div className='text-body-sm'>$ 35.99</div>
		</div>
	)
}
function CardImage() {
	return (
		<div className='h-[280px] w-full'>
			<Image
				src='https://bloomscape.com/cdn-cgi/image/quality=75,fit=scale-down,height=580,width=696,metadata=copyright,format=webp/wp-content/uploads/2023/08/230805_BB_fiscus_elastica_tineke_0876-e1692910966662.jpg?ver=1057285'
				alt='product card'
				width={0}
				height={0}
				sizes='100vw'
			></Image>
		</div>
	)
}

function AddToCartButton() {
	return (
		<span className='flex h-fit w-fit  items-center justify-center rounded-[100%] bg-primary-625 p-[12px]'>
			<ShoppingBagIcon
				className='aspect-square w-[20px]'
				color='#fff'
			/>
		</span>
	)
}
