import { ReactNode } from 'react'
import { create } from 'zustand'

type ModalState = {
	activeDialog:
		| {
				id: string
				dialog: ReactNode
		  }
		| undefined
	isDialogOpen: Boolean
	setDialog: (id: string, dialog: ReactNode) => void
	setIsDialogOpen: (isOpen: Boolean) => void
}

export const useDialogStore = create<ModalState>()((set) => ({
	activeDialog: undefined,
	isDialogOpen: false,
	setDialog: (id, dialog) =>
		set({
			activeDialog: {
				id: id,
				dialog: dialog,
			},
		}),
	setIsDialogOpen: (isOpen) => set({ isDialogOpen: isOpen }),
}))
