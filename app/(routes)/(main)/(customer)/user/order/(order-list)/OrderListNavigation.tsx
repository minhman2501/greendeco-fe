'use client'
import { ORDER_STATE_FIELD } from '@/app/_configs/constants/variables'
import useQueryParams from '@/app/_hooks/useQueryParams'
import clsx from 'clsx'
import Link from 'next/link'
import { useMemo } from 'react'

type QueryParams = {
	offSet: number
	field: string | null
}

export default function OrderNavigation() {
	const orderStates = useMemo(() => ORDER_STATE_FIELD, [])
	const { queryParams } = useQueryParams<QueryParams>()
	const fieldQuery: QueryParams['field'] = queryParams?.get('field')

	return (
		<ul className='mt-cozy flex capitalize'>
			<Link
				href={{
					pathname: '',
					query: {
						field: null,
					},
				}}
				className={clsx('w-fit    px-comfortable py-compact text-body-sm font-semi-bold ', {
					'border-b-[3px] border-primary-418 text-primary-418': fieldQuery === '',
					'border-b-[1px] border-primary-418-20 text-primary-418-60': fieldQuery !== '',
				})}
			>
				All
			</Link>
			{Object.entries(orderStates).map(([key, value]) => (
				<Link
					key={key}
					href={{
						pathname: '',
						query: {
							field: JSON.stringify(value),
						},
					}}
					className={clsx(
						'w-fit  px-comfortable py-compact text-body-sm font-semi-bold ',
						{
							'border-b-[3px] border-primary-418 text-primary-418':
								fieldQuery === JSON.stringify(value),
							'border-b-[1px] border-primary-418-20 text-primary-418-60':
								fieldQuery !== JSON.stringify(value),
						},
					)}
				>
					{key}
				</Link>
			))}
		</ul>
	)
}
