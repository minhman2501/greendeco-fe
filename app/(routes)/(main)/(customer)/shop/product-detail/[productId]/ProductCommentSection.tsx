import { StarIcon } from '@heroicons/react/24/solid'

export default function CommentSection() {
	return (
		<div className='rounded-[8px] bg-white p-comfortable shadow-38'>
			<h3 className='text-body-lg text-primary-418'>Comments & Ratings</h3>
			<div
				className='flex-col-start gap-cozy divide-y divide-primary-625
            '
			>
				<OverallRating />
				<div className='flex-col-start gap-cozy p-cozy'>
					<CommentItem />
					<CommentItem />
					<CommentItem />
					<CommentItem />
				</div>
			</div>
		</div>
	)
}

function CommentItem() {
	return (
		<span className='flex-col-start gap-compact'>
			<div className='flex items-center gap-cozy'>
				<span className='aspect-square w-[60px] rounded-[100%] bg-primary-5555'></span>
				<span className='flex-col-start h-full flex-1 justify-center gap-[4px]'>
					<span className='text-body-md font-semi-bold'>Nguyen Thanh Van</span>
					<span className='flex gap-[4px]'>
						<StarIcon className='aspect-square w-[16px] text-primary-625' />
						<StarIcon className='aspect-square w-[16px] text-primary-625' />
						<StarIcon className='aspect-square w-[16px] text-primary-625' />
						<StarIcon className='aspect-square w-[16px] text-primary-625' />
						<StarIcon className='aspect-square w-[16px] text-primary-625' />
					</span>
				</span>
			</div>
			<p className='text-body-sm'>Cay rat dep, se ung ho them nua!</p>
		</span>
	)
}

function OverallRating() {
	return (
		<div className='flex-col-start items-center gap-[4px]'>
			<span className='flex items-center gap-compact text-body-sm'>
				Rated: <span className='text-[3rem] font-bold text-primary-625'>4.5</span>/ 5.0
			</span>
			<div className='flex gap-compact'>
				<span className='rounded-[6px] bg-primary-625 p-[4px]'>
					<StarIcon className='aspect-square w-[48px] text-white' />
				</span>
				<span className='rounded-[6px] bg-primary-625 p-[4px]'>
					<StarIcon className='aspect-square w-[48px] text-white' />
				</span>
				<span className='rounded-[6px] bg-primary-625 p-[4px]'>
					<StarIcon className='aspect-square w-[48px] text-white' />
				</span>
				<span className='rounded-[6px] bg-primary-625 p-[4px]'>
					<StarIcon className='aspect-square w-[48px] text-white' />
				</span>
				<span className='rounded-[6px] bg-primary-625 p-[4px]'>
					<StarIcon className='aspect-square w-[48px] text-white' />
				</span>
			</div>
		</div>
	)
}
