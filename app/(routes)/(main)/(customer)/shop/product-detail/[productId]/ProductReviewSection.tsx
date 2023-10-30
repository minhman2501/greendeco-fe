import { BookmarkSlashIcon, StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { ProductData } from '@/app/_api/axios/product'
import {
	ReviewItemData,
	ReviewListResponseData,
	ReviewSortParams,
	getReviewListByProductId,
} from '@/app/_api/axios/reviews'
import { DEFAULT_AVATAR } from '@/app/_configs/constants/images'
import { MutatingDots } from 'react-loader-spinner'
import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react'

export default function ReviewSection({ productId }: { productId: ProductData['id'] }) {
	const [reviewSortParam, setReviewSortParam] = useState<ReviewSortParams>({
		limit: 5,
		offSet: 1,
		sort: 'desc',
		sortBy: 'created_at',
	})

	const useReviewQuery = useQuery({
		queryKey: ['review', productId, reviewSortParam],
		queryFn: () => getReviewListByProductId(productId, reviewSortParam),
		onError: (e) => console.log(e),
	})

	const { data, isLoading, isSuccess, isError } = useReviewQuery
	return (
		<div className='rounded-[8px] bg-white p-comfortable shadow-38'>
			<h3 className='text-heading-3 text-primary-625'>Comments & Ratings</h3>
			<div className='flex items-center justify-between'>
				<SortByStarMenu
					currentSelectedStar={reviewSortParam.star}
					setReviewSortParam={setReviewSortParam}
				/>
				<ReviewSorter setSortOption={setReviewSortParam} />
			</div>
			<div
				className='flex-col-start gap-cozy divide-y divide-primary-625
            '
			>
				{isLoading && (
					<span className='flex  justify-center '>
						<MutatingDots
							height='100'
							width='100'
							color='#56776C'
							secondaryColor='#56776C'
							radius='12.5'
							ariaLabel='mutating-dots-loading'
							visible={true}
						/>
					</span>
				)}
				{isSuccess && (
					<>
						{data.page_size > 0 ? (
							<>
								<ReviewList reviewList={data.items} />
							</>
						) : (
							<NoReviewMessage />
						)}
					</>
				)}
			</div>
		</div>
	)
}

function ReviewList({ reviewList }: { reviewList: ReviewListResponseData['items'] }) {
	return (
		<div className='flex-col-start gap-cozy p-cozy'>
			{reviewList.map((review) => (
				<ReviewItem
					{...review}
					key={review.id}
				/>
			))}
		</div>
	)
}

function ReviewItem(props: ReviewItemData) {
	const { avatar, firstName, lastName, star, content } = props
	return (
		<span className='flex-col-start gap-compact'>
			<div className='flex items-center gap-cozy'>
				<span className='relative aspect-square w-[60px] overflow-hidden rounded-[100%] bg-primary-5555'>
					<Image
						fill
						src={avatar ? avatar : DEFAULT_AVATAR}
						alt='customer avatar'
						className='opacity-0 transition-opacity duration-[.5s]'
						onLoadingComplete={(image) => image.classList.remove('opacity-0')}
						style={{ objectFit: 'fill' }}
					/>
				</span>
				<span className='flex-col-start h-full flex-1 justify-center '>
					<span className='text-body-md font-semi-bold text-primary-418'>
						{firstName} {lastName}
					</span>
					<span className='flex items-center gap-[2px] text-body-xsm'>
						Rated{' '}
						<span className='text-body-lg font-bold text-primary-625'>{star}</span> /5
						<StarIcon className='aspect-square w-[24px] translate-y-[-1px] text-primary-625' />
					</span>
				</span>
			</div>
			<p className='text-body-sm'>{content}</p>
		</span>
	)
}

/* function OverallRating() {
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
} */

type SortOptionsType = {
	sort?: 'asc' | 'desc'
	sortBy?: 'created_at' | 'star'
}

function ReviewSorter({
	setSortOption,
}: {
	setSortOption: Dispatch<SetStateAction<ReviewSortParams>>
}) {
	const sortOptionList: SortOptionsType[] = [
		{
			sort: 'desc',
			sortBy: 'created_at',
		},
		{
			sort: 'asc',
			sortBy: 'star',
		},
		{
			sort: 'desc',
			sortBy: 'star',
		},
	]

	const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		const sortOption: SortOptionsType = JSON.parse(event.target.value)

		setSortOption((prev) => ({ ...prev, sortBy: sortOption.sortBy, sort: sortOption.sort }))
	}

	return (
		<select
			className='bg-transparent text-body-xsm font-semi-bold text-primary-418-80'
			onChange={onSelect}
		>
			{sortOptionList.map((opt) => (
				<option
					key={JSON.stringify(opt)}
					value={JSON.stringify(opt)}
				>
					{opt.sortBy === 'star' &&
						(opt.sort === 'asc'
							? 'Lowest Rated'
							: opt.sort === 'desc'
							? 'Highest Rated'
							: '')}
					{opt.sortBy === 'created_at' && 'Newest'}
				</option>
			))}
		</select>
	)
}

function SortByStarMenu({
	currentSelectedStar,
	setReviewSortParam,
}: {
	currentSelectedStar: ReviewSortParams['star']
	setReviewSortParam: Dispatch<SetStateAction<ReviewSortParams>>
}) {
	const starGrades: number[] = [1, 2, 3, 4, 5]

	const onSelect = (event: ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value)

		setReviewSortParam((prev) => ({
			...prev,
			star: parseInt(event.target.value),
			sort: 'desc',
			sortBy: 'created_at',
		}))
	}
	return (
		<div className='flex gap-compact'>
			{starGrades.map((star) => (
				<span
					key={star}
					className='flex items-center gap-[4px]'
				>
					<input
						type='radio'
						name='site_name'
						value={star}
						checked={star === currentSelectedStar}
						onChange={onSelect}
					/>
					<span className='flex items-center gap-[4px]'>
						{star}
						<StarIcon className='aspect-square w-[14px] translate-y-[-1px] text-primary-625' />
					</span>
				</span>
			))}
		</div>
	)
}

function NoReviewMessage() {
	return (
		<div className='flex-col-start  w-full items-center gap-compact p-comfortable'>
			<BookmarkSlashIcon className='aspect-square w-[60px] text-primary-418' />
			<p className='text-body-md text-primary-418'>There is no review for this plant yet</p>
		</div>
	)
}
