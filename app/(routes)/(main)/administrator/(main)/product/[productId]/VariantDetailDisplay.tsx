'use client'
import { ProductData, VariantData } from '@/app/_api/axios/product'
import { EMPTY_STRING } from '@/app/_configs/constants/variables'
import Image from 'next/image'

export default function VariantDetailDisplay({ variant }: { variant: VariantData }) {
	return (
		<div className='grid grid-cols-3 gap-comfortable'>
			<VariantImage image={variant.image} />
			<Detail {...variant} />
			<Dates {...variant} />
		</div>
	)
}

function VariantImage({ image }: { image: VariantData['image'] }) {
	return (
		<div className='relative aspect-square h-full overflow-hidden rounded-[4px] border-[1px] border-primary-625-20 '>
			<Image
				fill
				style={{ objectFit: 'contain' }}
				src={image}
				alt='product image'
			></Image>
		</div>
	)
}

function Detail({ description, color_name, name, price, available, color }: VariantData) {
	return (
		<div className='flex-col-start gap-compact'>
			<span>Name: {name}</span>
			<span>Description: {description}</span>
			<span>Color: {color_name}</span>
			<span>Price: {price}</span>
			<span>Available: {available ? 'true' : 'false'}</span>
		</div>
	)
}

function Dates({ created_at, updated_at }: VariantData) {
	return (
		<div className='flex-col-start gap-compact'>
			<span>Date Created: {created_at}</span>
			<span>Last Updated: {updated_at}</span>
		</div>
	)
}
