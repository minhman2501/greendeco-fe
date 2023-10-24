'use client'

import type { ChangeEvent } from 'react'
import useQueryParams from '@/app/_hooks/useQueryParams'
import { useCallback } from 'react'

type SortOptionsType = {
	sort?: 'asc' | 'desc'
	sortBy?: string
}

type QueryParams<T> = Partial<T> & { offSet: number }

const options: SortOptionsType[] = [
	{
		sort: 'desc',
		sortBy: 'created_at',
	},
	{
		sort: 'asc',
		sortBy: 'price',
	},
	{
		sort: 'desc',
		sortBy: 'price',
	},
]

export const SortMenu = () => {
	const { queryObject, setQueryParams } = useQueryParams<QueryParams<SortOptionsType>>()

	const optionFilter = queryObject

	const onSelect = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const value: SortOptionsType = JSON.parse(event.target.value)
			if (value === optionFilter || !event.target.value) {
				setQueryParams({
					sort: undefined,
					sortBy: undefined,
				})
				return
			}

			setQueryParams({ sort: value.sort, sortBy: value.sortBy, offSet: 1 })
		},
		[setQueryParams, optionFilter],
	)

	return (
		<select
			className='rounded-[4px] border-[1px] border-primary-625 bg-primary-5555 px-cozy py-compact text-body-md text-white'
			onChange={onSelect}
		>
			{/*NOTE: option value type can be only string => stringify the object */}
			{options.map((opt) => (
				<option
					key={JSON.stringify(opt)}
					value={JSON.stringify(opt)}
				>
					{opt.sortBy === 'price' &&
						(opt.sort === 'asc'
							? 'Price Increase'
							: opt.sort === 'desc'
							? 'Price Decrease'
							: '')}
					{opt.sortBy === 'created_at' && 'Newest Release'}
				</option>
			))}
		</select>
	)
}
