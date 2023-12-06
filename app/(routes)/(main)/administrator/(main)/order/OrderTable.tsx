import { OrderTableData, OrderState } from '@/app/_api/axios/admin/order'
import { Dropdown } from '@/app/_components/dropdown'
import { ORDER_STATE_FIELD } from '@/app/_configs/constants/variables'
import formatDate from '@/app/_hooks/useFormatDate'
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
			<span className='inline-block w-full items-center justify-center'>
				<div>
					<b>{info.getValue().order_id}</b>
					<p>
						{info.getValue().user_name}({info.getValue().userPhoneNumber})
					</p>
				</div>
			</span>
		),
		header: () => <span>Order Detail</span>,
	}),

	columHelper.accessor('OrderData', {
		cell: (info) => (
			<span className='inline-block w-full text-center'>
				{info.getValue().shipping_address}
			</span>
		),
		header: () => <span>Shipping Address</span>,
	}),

	columHelper.accessor('OrderPrice.total', {
		cell: (info) => <span className='inline-block w-full text-center'>{info.getValue()}</span>,
		header: () => <span>Price</span>,
	}),

	columHelper.accessor('OrderData.created_at', {
		cell: (info) => (
			<span className='inline-block w-full text-center'>
				{formatDate(new Date(info.getValue()))}
			</span>
		),
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
	const states = ORDER_STATE_FIELD
	var stateList: { [key: string]: string[] } = {
		draft: [states.processing.state, states.cancelled.state],
		processing: [states.completed.state, states.cancelled.state],
		completed: [],
		cancelled: [],
	}

	const handleOnSelect = (value: string) => {
		alert(value)
		setState(value)
	}

	const baseInputStyle = 'border-0 w-[150px] text-white capitalize text-base '

	return (
		<div className='flex min-w-[140px] items-center justify-center'>
			<Dropdown
				data={stateList[state]}
				value={state}
				onSelect={handleOnSelect}
				inputStyle={
					state === states.draft.state
						? baseInputStyle + 'bg-order-status-draft'
						: state === states.processing.state
						? baseInputStyle + 'bg-order-status-processing'
						: state === states.completed.state
						? baseInputStyle + 'bg-order-status-completed'
						: baseInputStyle + 'bg-order-status-cancelled'
				}
				dropdownContainerStyle={'bg-white'}
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
		<div className='w-full overflow-hidden border-[1px] border-primary-625-40 '>
			<div className='w-full border-b-[1px] border-primary-625-60 p-3 text-2xl text-primary-418-60 '>
				{order.length} Order(s) in queue
			</div>
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
