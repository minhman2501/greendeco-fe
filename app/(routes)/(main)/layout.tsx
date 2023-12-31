'use client'
import ModalProvider from '@/app/_components/modal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const queryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
})

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ModalProvider>{children}</ModalProvider>
		</QueryClientProvider>
	)
}
