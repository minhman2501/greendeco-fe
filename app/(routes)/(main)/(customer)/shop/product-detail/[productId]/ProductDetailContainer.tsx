import { HeartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { VariantList } from './components'
import { ProductData, VariantData } from '@/app/_api/axios/product'

export type DetailContainerProps = {
	product: Pick<
		ProductData,
		| 'id'
		| 'detail'
		| 'description'
		| 'type'
		| 'size'
		| 'name'
		| 'difficulty'
		| 'light'
		| 'water'
		| 'default_variant'
	>
	variantList: VariantData[]
}

export default function DetailContainer({ product, variantList }: DetailContainerProps) {
	return (
		<div className='flex-col-start sticky top-comfortable h-fit gap-cozy rounded-[8px]  bg-primary-580-20 p-comfortable shadow-18'>
			<div className='flex items-center justify-between gap-cozy border-b-[1px] border-primary-5555-80 pb-cozy'>
				<h1 className='text-heading text-primary-625'>{product.name}</h1>
				{/* <HeartIcon className='aspect-square w-[36px]' /> */}
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold capitalize text-primary-418'>
					Pot Colors
				</h2>
				<VariantList variantList={variantList} />
			</div>
			<div className='flex-col-start gap-compact'>
				<span className='flex items-center justify-between'>
					<h2 className='text-body-lg font-semi-bold capitalize text-primary-418'>
						Description
					</h2>
					{/* <Link
						href={'/.'}
						className='text-body-xsm'
					>
						Read More
					</Link> */}
				</span>
				<p className='w-full text-justify text-body-sm'>{product.description}</p>
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold capitalize text-primary-418'>Size</h2>
				<p className='w-full text-justify text-body-sm'>{product.size}</p>
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold capitalize text-primary-418'>
					Caring difficulty
				</h2>
				<p className='w-full text-justify text-body-sm capitalize'>{product.difficulty}</p>
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold capitalize text-primary-418'>
					Ideal Light Condition
				</h2>
				<p className='w-full text-justify text-body-sm capitalize'>{product.light}</p>
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold capitalize text-primary-418'>
					Watering Rountine
				</h2>
				<p className='w-full text-justify text-body-sm capitalize'>{product.water}</p>
			</div>
		</div>
	)
}
