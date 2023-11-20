import { VariantData } from '@/app/_api/axios/product'
import formatDate from '@/app/_hooks/useFormatDate'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
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
				alt='variant image'
			></Image>
		</div>
	)
}

function Detail({ description, color_name, name, price, currency, available, color }: VariantData) {
	return (
		<div className='flex-col-start gap-cozy'>
			<span className='flex-col-start gap-[4px]'>
				<h3 className='text-body-sm'>Name:</h3>
				<span className='text-body-md'>{name}</span>
			</span>
			<span className='flex-col-start gap-[4px]'>
				<h3 className='text-body-sm'>Description:</h3>
				<span className='text-body-md'>{description}</span>
			</span>
			<span className='flex-col-start gap-[4px]'>
				<h3 className='text-body-sm'>Pot Color:</h3>
				<span className='flex items-center gap-compact'>
					<span className='text-body-md capitalize'>{color_name}</span>
					<span
						className='aspect-square h-[40px] rounded-[100%]'
						style={{ backgroundColor: color }}
					/>
				</span>
			</span>
			<span className='flex-col-start gap-[4px]'>
				<h3 className='text-body-sm'>Price:</h3>
				<span className='text-body-md'>
					{price} {currency}
				</span>
			</span>

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

function Dates({ created_at, updated_at }: VariantData) {
	return (
		<div className='flex-col-start gap-cozy'>
			<span className='flex-col-start gap-[4px]'>
				<h3 className='text-body-sm'>Date Created:</h3>
				<span className='text-body-md'>{formatDate(new Date(created_at))}</span>
			</span>
			<span className='flex-col-start gap-[4px]'>
				<h3 className='text-body-sm'>Last Updated:</h3>
				<span className='text-body-md'>{formatDate(new Date(updated_at))}</span>
			</span>
		</div>
	)
}
