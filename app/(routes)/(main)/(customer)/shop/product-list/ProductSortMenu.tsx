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
						(opt.sort === 'asc' ? 'Oldest' : opt.sort === 'desc' ? 'Newest' : '')}
				</option>
			))}
		</select>
	)
}
