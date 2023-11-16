import { ReactNode } from 'react'

export default function AdministratorMainLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<header>Header</header>
			<main>{children}</main>
		</>
	)
}
