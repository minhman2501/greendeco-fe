'use client'
import { StarIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import React, { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

export type RatingProps = {
	label?: string
	helperText?: string
	register?: UseFormRegisterReturn
	className?: string
	error?: boolean
}

const starGrades = [1, 2, 3, 4, 5]

export default function Rating(props: RatingProps) {
	const { className, label, helperText, error, register } = props

	const [rating, setRating] = useState<number>(0)

	return (
		<>
			<div className={clsx('flex-col-start gap-compact', className)}>
				{label && <label className='font-bold'>{label}</label>}
				<span className='flex w-full  items-center justify-center gap-compact'>
					{starGrades.map((star) => {
						return (
							<label
								className='h-[40px]'
								key={star}
							>
								<input
									{...register}
									type='radio'
									className='hidden'
									id={`star-${star}`}
									value={star}
									onClick={() => setRating(star)}
								/>
								<StarIcon
									className={clsx('aspect-square h-full cursor-pointer', {
										'text-status-success': star <= rating,
										'text-neutral-gray-2': star > rating,
									})}
								/>
							</label>
						)
					})}
				</span>
				{helperText && <p className={clsx({ 'text-status-error': error })}>{helperText}</p>}
			</div>
		</>
	)
}
