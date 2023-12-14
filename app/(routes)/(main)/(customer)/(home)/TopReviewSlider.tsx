'use client'
import { ProductListData } from '@/app/_api/axios/product'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid'

import { Swiper as SwiperType } from 'swiper'
import { useRef, useState } from 'react'
import clsx from 'clsx'
export default function TopReviewSlider() {
	const swiperRef = useRef<SwiperType>()
	const [activeIndex, setActiveIndex] = useState<number | undefined>()

	return (
		<>
			<Swiper
				modules={[Navigation, Autoplay]}
				className='items-center py-comfortable'
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				initialSlide={1}
				centeredSlides={true}
				speed={800}
				pagination={{
					clickable: true,
				}}
				onSlideChange={() => {
					setActiveIndex(swiperRef.current?.activeIndex)
				}}
				breakpoints={{
					300: {
						slidesPerView: 1,
					},
					1024: {
						slidesPerView: 2,
						spaceBetween: 30,
					},
				}}
				onBeforeInit={(swiper) => {
					swiperRef.current = swiper
				}}
				draggable
			>
				{[...Array(5)].map((star, i) => (
					<SwiperSlide key={i}>
						<ReviewItem active={i == activeIndex} />
					</SwiperSlide>
				))}
				<div className='flex w-full justify-end gap-compact'>
					<NavigationButton
						onClick={() => swiperRef.current?.slidePrev()}
						direction='prev'
					/>
					<NavigationButton
						onClick={() => swiperRef.current?.slideNext()}
						direction='next'
					/>
				</div>
			</Swiper>
		</>
	)
}

function ReviewItem({ active }: { active?: boolean }) {
	return (
		<div
			className={clsx(
				'flex-col-start w-full gap-cozy rounded-[16px] border-[2px] border-primary-5555 bg-neutral-gray-1 p-comfortable transition-all duration-[0.8s] ease-in-out',
				{
					'scale-90 opacity-30': !active,
				},
			)}
		>
			<div className='flex justify-between'>
				<div className='flex gap-cozy'>
					<span className='aspect-square h-[80px] rounded-[100%] bg-primary-5555'></span>
					<div className='flex-col-start gap-compact'>
						<span className='text-body-md font-semi-bold text-primary-625'>
							Nguyen Khai Tri
						</span>
						<span className='text-body-sm text-primary-418'>Customer</span>
					</div>
				</div>
			</div>
			<div className='flex-col-start gap-compact'>
				<div>
					<div className='flex gap-[4px] text-status-success'>
						{[...Array(5)].map((star, i) => (
							<StarIcon
								key={i}
								className='aspect-square h-[40px]'
							/>
						))}
					</div>
				</div>
				<p className='text-body-md text-primary-418'>Good</p>
			</div>
		</div>
	)
}

function NavigationButton({
	direction,
	onClick,
}: {
	direction: 'next' | 'prev'
	onClick: () => void
}) {
	return (
		<button
			className={clsx(
				'group  aspect-square rounded-[50%]  bg-primary-625 p-compact text-neutral-gray-1 ',
			)}
			onClick={onClick}
		>
			{direction === 'next' ? (
				<ChevronRightIcon className='aspect-square h-[20px] transition duration-100 ease-in group-hover:translate-x-[2px]  ' />
			) : (
				<ChevronLeftIcon className='aspect-square h-[20px] transition duration-100 ease-in group-hover:translate-x-[-2px] ' />
			)}
		</button>
	)
}
