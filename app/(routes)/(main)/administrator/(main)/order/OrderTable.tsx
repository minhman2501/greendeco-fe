import { OrderTableData, OrderState } from '@/app/_api/axios/admin/order'
import { Dropdown } from '@/app/_components/dropdown'
import {
	createColumnHelper,
	useReactTable,
	getCoreRowModel,
	flexRender,
} from '@tanstack/react-table'
import { useState } from 'react'

const columHelper = createColumnHelper<OrderTableData>()

const columns = [
	columHelper.accessor('owner_info', {
		cell: (info) => (
			<span className='inline-block w-full text-center'>
				<b>{info.getValue().order_id}</b>
				<p>
					{info.getValue().user_name}({info.getValue().userPhoneNumber})
				</p>
			</span>
		),
		header: () => <span>Order Detail</span>,
	}),

	columHelper.accessor('shipping_address', {
		cell: (info) => <span className='inline-block w-full text-center'>{info.getValue()}</span>,
		header: () => <span>Shipping Address</span>,
	}),

	columHelper.accessor('created_at', {
		cell: (info) => <span className='inline-block w-full text-center'>{info.getValue()}</span>,
		header: () => <span>Date Created</span>,
	}),

	columHelper.accessor('order_state', {
		id: 'Action',
		cell: (info) => {
			return <ActionWrapper order={info.getValue()} />
		},
		header: () => <span>Actions</span>,
	}),
]

const ActionWrapper = ({ order }: { order: OrderState }) => {
	const [state, setState] = useState(order.state)
	const data = ['draft', 'proccessing', 'completed', 'cancel']
	const handleOnSelect = (value: string) => {
		alert(value)
		setState(value)
	}

	const inputDefaultStyte = 'w-36 '
	const draftDefaultStyte = ''
	return (
		<div className='flex items-center justify-center gap-compact'>
			<Dropdown
				data={data}
				value={state}
				onSelect={handleOnSelect}
				containerStyle={
					state === 'draft' ? 'w-36!important bg-primary-5555-20' : 'bg-gray-300'
				}
				inputStyle={
					state === 'draft' ? ' w-36!important bg-primary-5555-20' : 'bg-gray-300'
				}
				dropdownContainerStyle={
					state === 'draft' ? 'w-36 bg-primary-5555-20' : 'bg-gray-300'
				}
			/>
		</div>
	)
}

export default function OrderTable({ order }: { order: OrderTableData[] }) {
	const data = [...order]
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
