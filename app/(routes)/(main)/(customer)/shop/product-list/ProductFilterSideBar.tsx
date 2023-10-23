'use client'
import { useCallback, type ChangeEvent } from 'react'
import useQueryParams from '@/app/_hooks/useQueryParams'
import { FunnelIcon } from '@heroicons/react/24/solid'

type FieldQuery = {
	size?: string
	light?: string
	difficulty?: string
	type?: string
}

type QueryParams = {
	offSet: number
	field: string | null
}

const sizeOptions = ['S', 'M', 'L', 'XL']
const difficultyOptions = ['easy', 'medium', 'hard']
const typeOptions = ['Outdoor', 'Indoor']

const options = {
	size: sizeOptions,
	difficulty: difficultyOptions,
	type: typeOptions,
}

function FilterMenu() {
	const { queryParams, setQueryParams } = useQueryParams<QueryParams>()
	const fieldQuery = queryParams?.get('field')
	const object: FieldQuery = fieldQuery ? JSON.parse(fieldQuery) : {}

	const filterSearch = useCallback(
		(field: FieldQuery) => {
			//NOTE: Validate field before assign to the fieldQueryObject
			Object.entries(field).forEach(([key, value]) => {
				if (key === 'size' || key === 'type' || key === 'light' || key === 'difficulty') {
					if (value) object[key] = value
					else delete object[key]
				}
			})
			if (Object.keys(object).length === 0) {
				setQueryParams({ field: undefined, offSet: 1 })
				return
			}

			setQueryParams({ field: JSON.stringify(object), offSet: 1 })
		},
		[setQueryParams, object],
	)

	const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
		filterSearch({ [event.target.name]: event.target.value })
	}

	return (
		<div className='flex-col-start gap-cozy'>
			{Object.entries(options).map(([key, value]) => (
				<div
					key={key}
					className='grid grid-cols-6 gap-compact'
				>
					<span className='col-span-2 flex items-center text-body-sm  capitalize text-primary-5555'>
						{key}
					</span>
					<select
						onChange={handleOptionChange}
						name={key}
						className='col-span-4 rounded-[4px] border-[1px] border-primary-625 bg-transparent px-cozy py-compact text-body-md text-primary-5555'
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
				</div>
			))}
		</div>
	)
}

export default function FilterSideBar() {
	return (
		<div className='max-h-screen rounded-[8px]  bg-white  p-comfortable shadow-63'>
			<span className='mb-[16px] flex items-center gap-compact text-body-md text-primary-625'>
				<h3>Filter</h3> <FunnelIcon className='aspect-square w-[24px]' />
			</span>
			<FilterMenu />
		</div>
	)
}
