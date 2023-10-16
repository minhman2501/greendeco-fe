import React from 'react'

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<header>Header</header>
			<main>{children}</main>
			<footer>Footer</footer>
		</>
	)
}
