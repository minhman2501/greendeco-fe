import { ProductData } from '@/app/_api/axios/product'
import Image from 'next/image'
import Button from '@/app/_components/Button'
import { StarIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import useCreateProductReviewDialog from '@/app/_hooks/dialog/useCreateReviewDialog'
import { useRouter } from 'next/navigation'
import { SHOP_ROUTE } from '@/app/_configs/constants/variables'

export default function PurchasedProductList({ productList }: { productList: ProductData[] }) {
	return (
		<ul className=' grid gap-cozy lg:grid-cols-2  '>
			{productList.map((product) => (
				<li key={product.id}>
					<Item product={product} />
				</li>
			))}
		</ul>
	)
}

const Item = ({ product }: { product: ProductData }) => {
	return (
		<div className='flex w-full gap-compact overflow-hidden rounded-[16px] border-[1px] border-primary-580-60 bg-neutral-gray-1 shadow-18'>
			<ItemImage imageSrc={product.images} />
			<div className='flex-col-start flex-1 justify-between p-cozy '>
				<ItemDetail name={product.name} />
				<ItemButtons {...product} />
			</div>
		</div>
	)
}

function ItemImage({ imageSrc }: { imageSrc: ProductData['images'] }) {
	return (
		<div className='relative aspect-square w-[140px] overflow-hidden  '>
			<Image
				src={imageSrc[0]}
				fill
				style={{ objectFit: 'fill' }}
				alt='purchased product image'
			/>
		</div>
	)
}
function ItemDetail({ name }: { name: ProductData['name'] }) {
	return <span className='text-body-md font-semi-bold text-primary-418'>{name}</span>
}

function ItemButtons(product: ProductData) {
	const router = useRouter()
	const { openCreateProductReviewDialog } = useCreateProductReviewDialog({
		productId: product.id,
	})

	return (
		<div className='flex items-center justify-between gap-cozy'>
			<Button
				type='button'
				onClick={() => openCreateProductReviewDialog()}
				className='flex  flex-1 items-center justify-center gap-[4px] text-body-sm font-semi-bold'
			>
				Review
				<StarIcon className='aspect-square h-[16px]' />
			</Button>
			<Button
				onClick={() => router.push(`${SHOP_ROUTE.PRODUCT_DETAIL.LINK}/${product.id}`)}
				type='button'
				className='btnSecondary flex flex-1 items-center justify-center gap-[4px] text-body-sm font-semi-bold'
			>
				View
				<MagnifyingGlassIcon className='aspect-square h-[16px]' />
			</Button>
		</div>
	)
}
