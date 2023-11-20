import { VariantData } from '@/app/_api/axios/product'
import clsx from 'clsx'

export default function VariantDisplay({ variantList }: { variantList: VariantData[] }) {
	return (
		<>
			<div className='flex items-center gap-cozy'>
				<h2>Variants</h2>
				<ul className='flex divide-x'>
					{variantList.map((variant) => (
						<li
							key={variant.id}
							className='px-cozy first:pl-0 last:pr-0'
						>
							<VariantItem {...variant} />
						</li>
					))}
				</ul>
			</div>
		</>
	)
}

const VariantItem = ({
	id,
	color,
	color_name,
}: {
	id: VariantData['id']
	color: VariantData['color']
	color_name: VariantData['color_name']
}) => {
	return (
		<div
			className={clsx('flex cursor-pointer items-center gap-[8px]', {
				// 'pointer-events-none': isActive,
			})}
		>
			<span
				className={clsx('h-[30px] w-[40px] rounded-[4px] ', {
					/* 'border-[1px] border-primary-625-60': !isActive,
					'border-[3px] border-primary-625': isActive, */
				})}
				style={{ backgroundColor: color }}
			></span>
			<p
				className={clsx('text-body-sm capitalize text-primary-418', {
					// 'font-semi-bold': isActive,
				})}
			>
				{color_name}
			</p>
		</div>
	)
}
