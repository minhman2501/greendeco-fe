'use client'
import { useCallback } from 'react'
import useQueryParams from '@/app/_hooks/useQueryParams'
import Button from '@/app/_components/Button'

type PaginationProps = {
	offSet: number
	next: boolean
	prev: boolean
}

type QueryPararms = Pick<PaginationProps, 'offSet'>

export default function Pagination(props: PaginationProps) {
	const { offSet, next, prev } = props

	const { setQueryParams } = useQueryParams<QueryPararms>()
	const currentPage = offSet

	const changePage = useCallback(
		(pageNumber: number) => {
			if (pageNumber === currentPage || !pageNumber) setQueryParams({ offSet: undefined })

			setQueryParams({ offSet: pageNumber })
		},
		[setQueryParams, currentPage],
	)

	const handlePageChange = (destinationPage: number) => {
		changePage(destinationPage)
	}

	return (
		<div className='flex items-center justify-center gap-cozy'>
			<Button
				disabled={!prev}
				onClick={() => handlePageChange(currentPage - 1)}
			>
				Previous Page
			</Button>
			<Button
				disabled={!next}
				onClick={() => handlePageChange(currentPage + 1)}
			>
				Next Page
			</Button>
		</div>
	)
}
