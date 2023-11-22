'use client'
import Link from 'next/link'
import formatDate from '@/app/_hooks/useFormatDate'
import { useState } from 'react'

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { ProductData } from '@/app/_api/axios/product'
import { ADMINISTRATOR_ROUTE, VARIANT_CURRENCY } from '@/app/_configs/constants/variables'
import DeleteProduct from './DeleteProduct'

const columnHelper = createColumnHelper<ProductData>()

const columns = [
	columnHelper.accessor('name', {
		cell: (info) => <span className='font-semi-bold'>{info.getValue()}</span>,
		header: () => <span>Product Name</span>,
	}),
	columnHelper.accessor('type', {
		cell: (info) => <span className='inline-block w-full text-center'>{info.getValue()}</span>,
		header: () => <span>Type</span>,
	}),
	columnHelper.accessor('available', {
		id: 'available',
		cell: (info) => {
			if (info.getValue()) return 'yes'
			return 'no'
		},
		header: () => <span>Available</span>,
	}),
	columnHelper.accessor('is_publish', {
		cell: (info) => {
			if (info.getValue()) return 'yes'
			return 'no'
		},
		header: () => <span>Published</span>,
	}),
	columnHelper.accessor('created_at', {
		cell: (info) => (
			<span className='inline-block w-full text-center'>
				{formatDate(new Date(info.getValue()))}
			</span>
		),
		header: () => <span>Create Date</span>,
	}),
	columnHelper.accessor('id', {
		id: 'Action',
		cell: (info) => {
			const id = info.getValue()
			return (
				<span>
					<Link href={`${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/${id}`}>Edit</Link>
					<DeleteProduct productId={id} />
				</span>
			)
		},
		header: () => <span>Actions</span>,
	}),
]

export default function ProductTable({ product }: { product: ProductData[] }) {
	const data = [...product]
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className='w-full overflow-hidden rounded-[8px] border-[1px] border-primary-625-40 '>
			<table className='w-full'>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr
							className='border-b-[1px] border-primary-625-80'
							key={headerGroup.id}
						>
							{headerGroup.headers.map((header) => (
								<th
									className='border-r-[1px] border-primary-625 bg-primary-5555-20 p-compact text-body-sm text-primary-625 last:border-0'
									key={header.id}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr
							className='border-b-[1px] border-primary-625 last:border-0 hover:bg-primary-5555-20/50'
							key={row.id}
						>
							{row.getVisibleCells().map((cell) => (
								<td
									className='border-r-[1px] border-primary-625 p-compact text-body-sm last:border-0'
									key={cell.id}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.footer,
												header.getContext(),
										  )}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
		</div>
	)
}
