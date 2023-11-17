import { ReactNode } from 'react'
import { AdministratorHeader as Header } from '../Header'

export default function AdministratorMainLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			<main>
				<div className='container'>{children}</div>
			</main>
		</>
	)
}
