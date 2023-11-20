import { VariantData } from '@/app/_api/axios/product'
import clsx from 'clsx'
import VariantDetailDisplay from './VariantDetailDisplay'

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
							<VariantListItem {...variant} />
						</li>
					))}
				</ul>
			</div>
			<VariantDetailDisplay variant={{ ...variantList[1] }} />
		</>
	)
}

const VariantListItem = ({
	id,
	color,
	color_name,
}: {
	id: VariantData['id']
	color: VariantData['color']
	color_name: VariantData['color_name']
}) => {
	return (
		<div className={clsx('flex items-center gap-[8px]')}>
			<span
				className={clsx('h-[30px] w-[40px] rounded-[4px]')}
				style={{ backgroundColor: color }}
			></span>
			<p className={clsx('text-body-sm capitalize text-primary-418')}>{color_name}</p>
		</div>
	)
}
