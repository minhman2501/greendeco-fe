'use client'
import { useCallback } from 'react'
import useQueryParams from '@/app/_hooks/useQueryParams'
import Button from '@/app/_components/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'

type PaginationProps = {
	next: boolean
	prev: boolean
}

type QueryPararms = {
	offSet: number
}

export default function Pagination(props: PaginationProps) {
	const { next, prev } = props

	const { queryParams, setQueryParams } = useQueryParams<QueryPararms>()

	const offSetValue = queryParams?.get('offSet')
	const currentPage: QueryPararms['offSet'] =
		offSetValue && offSetValue !== '0' ? Number.parseInt(offSetValue) : 1

	const changePage = useCallback(
		(pageNumber: number) => {
			return pageNumber === 0
				? setQueryParams({ offSet: undefined })
				: setQueryParams({ offSet: pageNumber })
		},
		[setQueryParams],
	)

	const handlePageChange = (destinationPage: number) => {
		changePage(destinationPage)
	}

	return (
		<div className='flex items-center justify-center gap-cozy'>
			<Button
				className='flex  items-center  gap-compact rounded-[4px] px-cozy py-compact font-normal'
				disabled={!prev}
				onClick={() => handlePageChange(currentPage - 1)}
			>
				<ArrowLeftIcon className='aspect-square w-[16px]' />
				Previous
			</Button>
			<Button
				className='flex  items-center  gap-compact rounded-[4px] px-cozy py-compact font-normal'
				disabled={!next}
				onClick={() => handlePageChange(currentPage + 1)}
			>
				Next
				<ArrowRightIcon className='aspect-square w-[16px]' />
			</Button>
		</div>
	)
}
