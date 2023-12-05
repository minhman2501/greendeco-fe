import { ProductData } from '@/app/_api/axios/product'
import Image from 'next/image'

export default function PurchasedProductList({ productList }: { productList: ProductData[] }) {
	return (
		<ul className=' grid grid-cols-2 gap-cozy  '>
			{productList.map((product) => (
				<li key={product.id}>
					<Item product={product} />
				</li>
			))}
		</ul>
	)
}

const Item = ({ product }: { product: ProductData }) => {
	const { name, images, id, price, currency } = product
	return (
		<div className='flex w-full gap-compact overflow-hidden rounded-[16px] border-[1px] border-primary-580-60 bg-neutral-gray-1 shadow-18'>
			<ItemImage imageSrc={product.images} />
			<ItemDetail {...product} />
		</div>
	)
}

function ItemImage({ imageSrc }: { imageSrc: ProductData['images'] }) {
	return (
		<div className='relative aspect-square w-[160px] overflow-hidden  '>
			<Image
				src={imageSrc[0]}
				fill
				style={{ objectFit: 'fill' }}
				alt='purchased product image'
			/>
		</div>
	)
}
const ItemDetail = ({ name }: ProductData) => {
	return (
		<div className='flex-col-start h-full justify-between p-cozy'>
			<div className='flex-col-start gap-[4px]'>
				<div className='flex items-center justify-between text-primary-625'>
					<span className='text-body-md font-semi-bold '>{name}</span>
				</div>
			</div>
		</div>
	)
}
