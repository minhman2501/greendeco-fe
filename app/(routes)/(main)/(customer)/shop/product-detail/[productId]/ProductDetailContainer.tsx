import { HeartIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'

export default function DetailContainer() {
	return (
		<div className='flex-col-start gap-cozy rounded-[8px] border-[1px] border-primary-580 bg-primary-580-20 p-comfortable'>
			<div className='flex items-center justify-between gap-cozy border-b-[1px] border-primary-5555-80 pb-cozy'>
				<h1 className='text-heading text-primary-625'>Variegated Pink Lemon Tree</h1>
				<HeartIcon className='aspect-square w-[36px]' />
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold'>Pot Colors</h2>
				<div className='flex gap-cozy'>
					<div className='flex-col-start items-center justify-center gap-[4px] px-cozy py-[4px]'>
						<span className='aspect-square w-[40px] rounded-[100%] bg-primary-580'></span>
						<p className='text-body-sm'>Stone</p>
					</div>
					<div className='flex-col-start items-center justify-center gap-[4px] px-cozy py-[4px]'>
						<span className='aspect-square w-[40px] rounded-[100%] bg-primary-580'></span>
						<p className='text-body-sm'>Stone</p>
					</div>
					<div className='flex-col-start items-center justify-center gap-[4px] px-cozy py-[4px]'>
						<span className='aspect-square w-[40px] rounded-[100%] bg-primary-580'></span>
						<p className='text-body-sm'>Stone</p>
					</div>
					<div className='flex-col-start items-center justify-center gap-[4px] px-cozy py-[4px]'>
						<span className='aspect-square w-[40px] rounded-[100%] bg-primary-580'></span>
						<p className='text-body-sm'>Stone</p>
					</div>
				</div>
			</div>
			<div className='flex-col-start gap-compact'>
				<h2 className='text-body-lg font-semi-bold'>Better to have</h2>
				<div className='flex-col-start gap-compact'>
					<span className='flex overflow-hidden rounded-[8px] border-[1px] border-primary-580-40'>
						<span className='relative aspect-square w-[80px]'>
							<Image
								fill
								src={
									'https://bloomscape.com/cdn-cgi/image/quality=75,fit=scale-down,height=922,width=768,metadata=copyright,format=webp/wp-content/uploads/2022/06/bloomscape_watering-can_1b-scaled.jpg'
								}
								alt='plants art'
								style={{ objectFit: 'fill' }}
							/>
						</span>
						<span className='flex flex-1 items-center p-cozy'>
							<div className='flex-col-start w-full flex-1 gap-[4px]'>
								<span className='text-body-sm'>Watering Can</span>
								<span className='text-body-sm'>$ 14</span>
							</div>
							<span className='flex items-center justify-center rounded-[4px] border-[1px] border-primary-5555 p-[4px]'>
								<PlusIcon className='aspect-square w-[24px] text-primary-5555' />
							</span>
						</span>
					</span>
				</div>
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
