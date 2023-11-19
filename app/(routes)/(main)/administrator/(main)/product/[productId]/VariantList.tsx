import { ProductData, getVariantsByProductId } from '@/app/_api/axios/product'
import Block from '@/app/_components/Block'
import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

export default function VariantList({
	productName,
	productId,
}: {
	productName: ProductData['name']
	productId: ProductData['id']
}) {
	const variantQuery = useQuery({
		queryKey: ['variants', 'admin'],
		queryFn: () => getVariantsByProductId(productId),
	})

	const { data, isSuccess, isError } = variantQuery

	return (
		<>
			{data && data?.page_size > 0 && <h2>Variants</h2>}
			{data && data?.page_size === 0 && (
				<div>
					There is no variant
					<Link
						href={{
							pathname: `${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/variant/create`,
							query: {
								productId: productId,
							},
						}}
					>
						Create New Variant
					</Link>
				</div>
			)}
		</>
	)
}
