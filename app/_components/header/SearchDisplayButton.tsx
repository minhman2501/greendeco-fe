'use client'

import { BellIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import useNotification from '@/app/_hooks/useNotification'
import NotificationList from '../notification/NotificationList'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import ProductSearchForm from '../search/ProductSearchForm'

export default function SearchDisplayButton() {
	const [open, setOpen] = useState(false)

	const { scrollY } = useScroll()

	const handleOpenNotification = () => {
		setOpen(!open)
	}

	useMotionValueEvent(scrollY, 'change', (latestWindowY) => {
		const previousWindowY = scrollY.getPrevious()
		if (latestWindowY > previousWindowY && latestWindowY > 90) {
			setOpen(false)
		}
	})

	return (
		<>
			<button
				onClick={handleOpenNotification}
				className='group rounded-xl border-[1px] border-primary-5555-40 bg-primary-5555-20/40 px-[8px] py-[4px] text-primary-625 transition duration-75 ease-in hover:bg-primary-625 hover:text-neutral-gray-1'
			>
				<BellIcon className='aspect-square h-[24px] ' />
			</button>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{
							translateY: '-16px',
							opacity: 0,
							left: '50%',
							translateX: '-50%',
						}}
						animate={{ opacity: 1, translateY: 0 }}
						exit={{
							opacity: 0,
							translateY: '-16px',
						}}
						transition={{ ease: 'easeInOut', duration: 0.2 }}
						className='absolute top-[calc(100%+8px)] w-[60%] justify-center overflow-y-auto rounded-xl bg-white shadow-38 '
					>
						<ProductSearchForm />
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

function NotificationAmountDisplay({ amount }: { amount: number | undefined }) {
	if (amount && amount > 0)
		return (
			<span className='absolute right-[-4px] top-[-4px] flex aspect-square h-[16px] items-center justify-center rounded-[100%] border-[1px] border-primary-625 bg-primary-625 font-semi-bold text-white transition duration-75  ease-in group-hover:bg-white group-hover:text-primary-625'>
				{amount}
			</span>
		)
}
