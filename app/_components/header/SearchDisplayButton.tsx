'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import ProductSearchForm from '../search/ProductSearchForm'

export default function SearchDisplayButton() {
	const [open, setOpen] = useState(false)

	const { scrollY } = useScroll()

	const handleOpenSearchForm = () => {
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
				onClick={handleOpenSearchForm}
				className='group rounded-xl border-[1px] border-primary-5555-40 bg-primary-5555-20/40 px-[8px] py-[4px] text-primary-625 transition duration-75 ease-in hover:bg-primary-625 hover:text-neutral-gray-1'
			>
				<MagnifyingGlassIcon className='aspect-square h-[24px] ' />
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
