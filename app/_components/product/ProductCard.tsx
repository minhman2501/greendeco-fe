import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { ProductData } from '@/app/_api/axios/product'
import { useRouter } from 'next/navigation'

export type ProductCardProps = Pick<ProductData, 'id' | 'name' | 'images' | 'price'>

export default function ProductCard({ product }: { product: ProductCardProps }) {
	const productRouter = useRouter()
	const { id, name, images, price } = product
	return (
		<span
			className='group block w-full overflow-hidden rounded-[8px]   bg-white shadow-26   hover:cursor-pointer  '
			onClick={() => productRouter.push(`/shop/product-detail/${id}`)}
		>
			<CardImage imageUrl={images[0]} />
			<div className='flex w-full p-cozy'>
				<CardDetail
					name={name}
					price={price}
				/>
			</div>
		</span>
	)
}

function CardDetail({
	name,
	price,
}: {
	name: ProductCardProps['name']
	price: ProductCardProps['price']
}) {
	return (
		<div className='flex-col-start h-full w-full justify-between gap-cozy'>
			<div className='flex-col-start'>
				<span className='cursor-pointer text-body-sm font-semibold text-primary-625 group-hover:underline'>
					{name}
				</span>
				<span className='flex items-center gap-[2px]'>
					<StarIcon
						className='aspect-square h-[20px]'
						color='#FF8B28'
					/>
					<span className='text-body-xsm text-primary-418-60'>4.7 (15 reviews)</span>
				</span>
			</div>
			<div className='text-body-sm'>$ {price}</div>
		</div>
	)
}
function CardImage({ imageUrl }: { imageUrl: string }) {
	return (
		<div className='h-[240px] w-full overflow-hidden'>
			<Image
				src={imageUrl}
				alt='product image'
				className='duration-200 ease-in-out group-hover:scale-110'
				width={0}
				height={0}
				sizes='100vw'
			></Image>
		</div>
	)
}
