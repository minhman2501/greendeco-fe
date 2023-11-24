'use client'
import { ProductData } from '@/app/_api/axios/product'
import LabelProvider from '@/app/_components/form/LabelProvider'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Image from 'next/image'
import formatDate from '@/app/_hooks/useFormatDate'

export default function ProductDetail({ product }: { product: ProductData }) {
	return (
		<div className='grid grid-cols-2 gap-cozy border-x-[1px] border-primary-625-40 px-comfortable'>
			<ProductDetailDisplay {...product} />
			<div className='flex-col-start gap-cozy'>
				<ImageGrid images={product.images} />
				<Dates created_at={product.created_at} />
			</div>
		</div>
	)
}

function ProductDetailDisplay({
	name,
	description,
	size,
	type,
	light,
	water,
	available,
}: {
	name: ProductData['name']
	description: ProductData['description']
	size: ProductData['size']
	type: ProductData['type']
	light: ProductData['light']
	water: ProductData['water']
	available: ProductData['available']
}) {
	return (
		<div className='flex-col-start gap-cozy'>
			<LabelProvider
				label='Name:'
				className='gap-[4px] text-body-sm'
				direction='vertical'
			>
				<span className='text-body-md'>{name}</span>
			</LabelProvider>
			<LabelProvider
				label='Description:'
				className='gap-[4px] text-body-sm'
				direction='vertical'
			>
				<span className='text-body-md'>{description}</span>
			</LabelProvider>
			<LabelProvider
				label='Size:'
				className=' text-body-sm'
				direction='vertical'
			>
				<span className='text-body-md'>{size}</span>
			</LabelProvider>
			<LabelProvider
				label='Plant type:'
				className='gap-[4px] text-body-sm'
				direction='vertical'
			>
				<span className='text-body-md'>{type}</span>
			</LabelProvider>
			<LabelProvider
				label='Water Condition:'
				className='gap-[4px] text-body-sm'
				direction='vertical'
			>
				<span className='text-body-md'>{water}</span>
			</LabelProvider>
			<LabelProvider
				label='Light Direction:'
				className='gap-[4px] text-body-sm'
				direction='vertical'
			>
				<span className='text-body-md'>{light}</span>
			</LabelProvider>

			<span
				className={clsx(
					'flex w-fit items-center gap-compact rounded-[8px]  p-cozy text-body-lg font-semi-bold text-white',
					{
						'bg-action-link text-white': available,
						'bg-neutral-gray-6 text-white': !available,
					},
				)}
			>
				Available <CheckBadgeIcon className='aspect-square h-[24px]' />
			</span>
		</div>
	)
}

function ImageGrid({ images }: { images: ProductData['images'] }) {
	return (
		<div>
			<LabelProvider
				label='Images:'
				className='gap-[4px] text-body-sm'
				direction='vertical'
			>
				<div className='grid grid-cols-3 gap-cozy'>
					{images.map((image, index) => (
						<div
							key={index}
							className='relative aspect-square'
						>
							<Image
								fill
								style={{ objectFit: 'cover' }}
								src={image}
								alt='variant image'
							></Image>
						</div>
					))}
				</div>
			</LabelProvider>
		</div>
	)
}

function Dates({ created_at }: { created_at: ProductData['created_at'] }) {
	return (
		<div className='flex-col-start gap-cozy'>
			<LabelProvider
				label='Date Created:'
				className='gap-[4px] text-body-sm'
				direction='vertical'
			>
				<span className='text-body-md'>{formatDate(new Date(created_at))}</span>
			</LabelProvider>
		</div>
	)
}
