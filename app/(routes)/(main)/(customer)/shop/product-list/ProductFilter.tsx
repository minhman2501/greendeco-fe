'use client'
import { useCallback, type ChangeEvent } from 'react'
import useQueryParams from '@/app/_hooks/useQueryParams'

type FieldQuery = {
	size?: string
	light?: string
	difficulty?: string
	type?: string
}

type FieldString = {
	field: string | null
}

const sizeOptions = ['S', 'M', 'L']
const difficultyOptions = ['easy', 'medium', 'hard']
const typeOptions = ['Outdoor', 'Indoor']

const options = {
	size: sizeOptions,
	difficulty: difficultyOptions,
	type: typeOptions,
}

export default function FilterMenu() {
	const { queryParams, setQueryParams } = useQueryParams<FieldString>()
	const fieldQuery = queryParams?.get('field')
	const object: FieldQuery = fieldQuery ? JSON.parse(fieldQuery) : {}
	// console.log(object)

	const filterSearch = useCallback(
		(field: FieldQuery) => {
			Object.entries(field).forEach(([key, value]) => {
				if (key === 'size' || key === 'type' || key === 'light' || key === 'difficulty') {
					if (value) object[key] = value
					else delete object[key]
				}
			})

			setQueryParams({ field: object ? JSON.stringify(object) : null })
		},
		[setQueryParams, object],
	)

	const optionHandleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		filterSearch({ [event.target.name]: event.target.value })
	}

	return (
		<>
			{Object.entries(options).map(([key, value]) => (
				<select
					key={key}
					onChange={optionHandleChange}
					name={key}
				>
					<option value=''>All</option>
					{value.map((opt) => (
						<option
							key={opt}
							value={opt}
						>
							{opt}
						</option>
					))}
				</select>
			))}
		</>
	)
}
