'use client'
import { FilterParams } from '@/app/_api/axios/product'
import { useCallback, type ChangeEvent } from 'react'
import useQueryParams from '@/app/_hooks/useQueryParams'
import { useSearchParams } from 'next/navigation'

type FieldQuery = {
	size?: string
	light?: string
	difficulty?: string
	type?: string
}

type FieldString = {
	field: string
}

const sizeOptions = ['S', 'M', 'L']

export default function FilterMenu() {
	const { queryParams, setQueryParams } = useQueryParams<FieldString>()
	const fieldQuery = useSearchParams().get('field')
	const object: FieldQuery = fieldQuery ? JSON.parse(fieldQuery) : {}
	console.log(object)

	const filterSearch = useCallback(
		(field: FieldQuery) => {
			if (field === object || !field) {
				setQueryParams({
					field: undefined,
				})
				return
			}
			const { size, type, light, difficulty } = field
			if (size) object.size = size
			if (type) object.type = type
			if (light) object.light = light
			if (difficulty) object.difficulty = difficulty

			setQueryParams({ field: JSON.stringify(object) })
		},
		[setQueryParams, object],
	)
	const optionHandleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		filterSearch({ size: event.target.value })
	}

	return (
		<select
			onChange={optionHandleChange}
			itemType='size'
		>
			{sizeOptions.map((opt) => (
				<option
					key={opt}
					value={opt}
				>
					{opt}
				</option>
			))}
		</select>
	)
}
