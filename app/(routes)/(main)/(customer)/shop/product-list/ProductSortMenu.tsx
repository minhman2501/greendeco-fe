'use client'

import type { ChangeEvent } from 'react'
import useQueryParams from '@/app/_hooks/useQueryParams'
import { useCallback } from 'react'

type SortOptionsType = {
	sort?: 'asc' | 'desc'
	sortBy?: string
}

const options: SortOptionsType[] = [
	{
		sort: 'asc',
		sortBy: 'price',
	},
	{
		sort: 'desc',
		sortBy: 'price',
	},
	{
		sort: 'asc',
		sortBy: 'created_at',
	},
	{
		sort: 'desc',
		sortBy: 'created_at',
	},
]

export const SortMenu = () => {
	const { queryObject, setQueryParams } = useQueryParams<SortOptionsType>()

	const optionFilter = queryObject

	const onSelect = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			if (event.target.value === JSON.stringify(optionFilter) || !event.target.value) {
				setQueryParams({
					sort: undefined,
					sortBy: undefined,
				})
				return
			}

			setQueryParams(JSON.parse(event.target.value))
		},
		[setQueryParams, optionFilter],
	)

	return (
		<select onChange={onSelect}>
			{options.map((opt) => (
				<option
					key={JSON.stringify(opt)}
					value={JSON.stringify(opt)}
				>
					{opt.sortBy === 'price' &&
						(opt.sort === 'asc'
							? 'Price increase'
							: opt.sort === 'desc'
							? 'Price decrease'
							: '')}
					{opt.sortBy === 'created_at' &&
						(opt.sort === 'asc' ? 'Newest' : opt.sort === 'desc' ? 'Oldest' : '')}
				</option>
			))}
		</select>
	)
}
