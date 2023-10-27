import { HeartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { RecommendList, VariantList } from './components'

export default function DetailContainer() {
	return (
		<div className='flex-col-start gap-cozy rounded-[8px] border-[1px] border-primary-580 bg-primary-580-20 p-comfortable'>
			<div className='flex items-center justify-between gap-cozy border-b-[1px] border-primary-5555-80 pb-cozy'>
				<h1 className='text-heading text-primary-625'>Variegated Pink Lemon Tree</h1>
				<HeartIcon className='aspect-square w-[36px]' />
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold'>Pot Colors</h2>
				<VariantList />
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold'>Better to have</h2>
				<RecommendList />
			</div>
			<div className='flex-col-start gap-compact'>
				<span className='flex items-center justify-between'>
					<h2 className='text-body-lg font-semi-bold'>Better to have</h2>
					<Link
						href={'/.'}
						className='text-body-xsm'
					>
						Read More
					</Link>
				</span>
				<p className='w-full text-justify text-body-sm'>
					The Ficus Tineke (Ficus elastica), the vibrant younger sibling of our popular
					Burgundy Rubber Tree. Boasting variegated leaves in hues of creamy pink, yellow,
					and green, this rubber tree is a captivating presence in any interior setting,
					whether it graces your space solo or thrives amidst your collection.
				</p>
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold'>Caring difficulty</h2>
				<p className='w-full text-justify text-body-sm'>
					MD—12&quot;-16&quot; tall (including recycled plastic Ecopot).
				</p>
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold'>Ideal Light Condition</h2>
				<p className='w-full text-justify text-body-sm'>Bright Indirect to Direct.</p>
			</div>
		</div>
	)
}
