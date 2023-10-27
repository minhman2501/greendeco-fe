import { HeartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { RecommendList, VariantList } from './components'
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
	>
	variants: Pick<VariantData, 'id' | 'name' | 'color' | 'color_name'>[]
}

export default function DetailContainer({ product, variants }: DetailContainerProps) {
	return (
		<div className='flex-col-start gap-cozy rounded-[8px] border-[1px] border-primary-580 bg-primary-580-20 p-comfortable'>
			<div className='flex items-center justify-between gap-cozy border-b-[1px] border-primary-5555-80 pb-cozy'>
				<h1 className='text-heading text-primary-625'>{product.name}</h1>
				<HeartIcon className='aspect-square w-[36px]' />
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold capitalize'>Pot Colors</h2>
				<VariantList variantList={variants} />
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold capitalize'>Better to have</h2>
				<RecommendList />
			</div>
			<div className='flex-col-start gap-compact'>
				<span className='flex items-center justify-between'>
					<h2 className='text-body-lg font-semi-bold capitalize'>Description</h2>
					<Link
						href={'/.'}
						className='text-body-xsm'
					>
						Read More
					</Link>
				</span>
				<p className='w-full text-justify text-body-sm'>{product.description}</p>
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold capitalize'>Size</h2>
				<p className='w-full text-justify text-body-sm'>{product.size}</p>
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold capitalize'>Caring difficulty</h2>
				<p className='w-full text-justify text-body-sm'>{product.difficulty}</p>
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold capitalize'>Ideal Light Condition</h2>
				<p className='w-full text-justify text-body-sm'>{product.light}</p>
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold capitalize'>Watering Rountine</h2>
				<p className='w-full text-justify text-body-sm'>{product.water}</p>
			</div>
		</div>
	)
}
