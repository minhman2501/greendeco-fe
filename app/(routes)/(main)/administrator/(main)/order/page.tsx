'use client'
import { Dropdown } from '@/app/_components/dropdown'
import React from 'react'

export default function OrderManagementPage() {
	const data = ['draft', 'proccessing', 'complete', 'cancel']
	const [state, setState] = React.useState('')
	const hanldeOnsubmit = (value: string) => {
		setState(value)
	}
	return (
		<div className='min-h-screen'>
			<h1>Manage Order</h1>
			<Dropdown
				value={state}
				onSelect={hanldeOnsubmit}
				data={data}
			/>
		</div>
	)
}
