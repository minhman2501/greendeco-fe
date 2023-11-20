import { VariantData } from '@/app/_api/axios/product'
import clsx from 'clsx'
import VariantDetailDisplay from './VariantDetailDisplay'
import { useState } from 'react'

export default function VariantDisplay({ variantList }: { variantList: VariantData[] }) {
	const [currentVariant, setCurrentVariant] = useState<VariantData>(variantList[0])
	return (
		<>
			<div className='mb-cozy flex items-center gap-cozy'>
				<h2>Variants</h2>
				<ul className='flex divide-x'>
					{variantList.map((variant) => (
						<li
							key={variant.id}
							onClick={() => setCurrentVariant(variant)}
							className={clsx(' px-cozy first:pl-0 last:pr-0')}
						>
							<VariantListItem
								{...variant}
								active={currentVariant.id === variant.id}
							/>
						</li>
					))}
				</ul>
			</div>
			<VariantDetailDisplay variant={{ ...currentVariant }} />
		</>
	)
}

const VariantListItem = ({
	active = false,
	color,
	color_name,
}: {
	active?: boolean
	color: VariantData['color']
	color_name: VariantData['color_name']
}) => {
	return (
		<div
			className={clsx('group flex items-center gap-[8px]  ', {
				'hover:cursor-pointer': !active,
				'pointer-events-none': active,
			})}
		>
			<span
				className={clsx('h-[30px] w-[40px] rounded-[4px]', {
					'border-[4px] border-primary-625': active,
				})}
				style={{ backgroundColor: color }}
			></span>
			<p
				className={clsx('text-body-sm capitalize text-primary-418', {
					'group-hover:font-semi-bold': !active,
					'font-bold': active,
				})}
			>
				{color_name}
			</p>
		</div>
	)
}
