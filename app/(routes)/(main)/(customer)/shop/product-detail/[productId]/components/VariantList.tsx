import { VariantData } from '@/app/_api/axios/product'
import { DetailContainerProps } from '../ProductDetailContainer'
import { useVariantStore } from '@/app/_configs/store/useVariantStore'

const Variant = ({
	id,
	name,
	color,
	color_name,
	onClick,
}: {
	id: string
	name: string
	color: string
	color_name: string
	onClick: () => void
}) => {
	const activeVariant = useVariantStore((state) => state.activeVariant)

	return (
		<div
			className='flex-col-start items-center justify-center gap-[4px] px-cozy py-[4px]'
			onClick={() => onClick()}
		>
			<span
				className='aspect-square w-[40px] rounded-[100%] border-[1px]'
				style={{ backgroundColor: color, borderColor: color }}
			></span>
			<p className='text-body-sm capitalize'>{color_name}</p>
		</div>
	)
}

export const VariantList = ({
	variantList,
}: {
	variantList: DetailContainerProps['variantList']
}) => {
	const setActiveVariant = useVariantStore((state) => state.setActiveVariant)
	return (
		<div className='flex gap-cozy'>
			{variantList.map((variant) => (
				<Variant
					onClick={() => setActiveVariant(variant)}
					{...variant}
					key={variant.id}
				/>
			))}
		</div>
	)
}
