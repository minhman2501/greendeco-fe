import React from 'react'

export default function UserSettingLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex-col-start gap-cozy rounded-[8px] bg-white p-comfortable shadow-30'>
			<nav>Setting Nav</nav>
			{children}
		</div>
	)
}
