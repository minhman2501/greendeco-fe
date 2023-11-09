import { useDialogStore } from '@/app/_configs/store/useDialogStore'
import React from 'react'

export default function ModalProvider({ children }: { children: React.ReactNode }) {
	const { activeDialog, setIsDialogOpen, isDialogOpen } = useDialogStore()
	return (
		<div className='relative min-h-screen'>
			{activeDialog && isDialogOpen && (
				<div
					className='absolute inset-0 z-[100] bg-primary-418/40'
					id={activeDialog.id}
				>
					{activeDialog.dialog}
				</div>
			)}
			{children}
		</div>
	)
}
