import clsx from 'clsx'
import { ProductCardProps } from '.'
import ProductCard from './ProductCard'

type ProductCardsGridProps = {
	productList: ProductCardProps[]
	columns: 3 | 4 | 5
	gap: 'comfortable' | 'cozy' | 'compact'
}
export default function ProductCardsGrid(props: ProductCardsGridProps) {
	const { productList, columns = 4, gap = 'cozy' } = props
	return (
		<div
			className={clsx(
				'grid',
				{
					'grid-cols-3': columns === 3,
					'grid-cols-4': columns === 4,
					'grid-cols-5': columns === 5,
				},
				{
					'gap-comfortable': gap === 'comfortable',
					'gap-cozy': gap === 'cozy',
					'gap-compact': gap === 'compact',
				},
			)}
		>
			{productList.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
				/>
			))}
		</div>
	)
}
