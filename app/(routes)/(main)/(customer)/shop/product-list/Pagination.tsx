'use client'
import { useCallback } from 'react'
import useQueryParams from '@/app/_hooks/useQueryParams'
import Button from '@/app/_components/Button'

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
			if (pageNumber === 0) {
				setQueryParams({ offSet: undefined })
				return
			}

			setQueryParams({ offSet: pageNumber })
		},
		[setQueryParams],
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
