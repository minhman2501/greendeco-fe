import { DetailContainerProps } from '../ProductDetailContainer'

const Variant = ({
	name,
	color,
	color_name,
}: {
	id: string
	name: string
	color: string
	color_name: string
}) => {
	return (
		<div className='flex-col-start items-center justify-center gap-[4px]  px-cozy py-[4px]'>
			<span
				className='aspect-square w-[40px] rounded-[100%] border-[1px]'
				style={{ backgroundColor: color, borderColor: color }}
			></span>
			<p className='text-body-sm capitalize'>{color_name}</p>
		</div>
	)
}

export const VariantList = ({ variantList }: { variantList: DetailContainerProps['variants'] }) => {
	return (
		<div className='flex gap-cozy'>
			{variantList.map((variant) => (
				<Variant
					{...variant}
					key={variant.id}
				/>
			))}
		</div>
	)
}
