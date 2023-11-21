import { ProductData, getVariantsByProductId } from '@/app/_api/axios/product'
import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import VariantDisplay from './VariantDislay'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'

export default function ProductVariantInfo({
	productName,
	productId,
}: {
	productName: ProductData['name']
	productId: ProductData['id']
}) {
	const variantQuery = useQuery({
		queryKey: [UseQueryKeys.Variant, ADMIN_QUERY_KEY, productId],
		queryFn: () => getVariantsByProductId(productId),
	})

	const { data, isSuccess, isError } = variantQuery

	return (
		<>
			{data && data?.page_size > 0 && (
				<VariantDisplay
					variantList={...data.items}
					productId={productId}
					productName={productName}
				/>
			)}
			{data && data?.page_size === 0 && (
				<div>
					There is no variant
					<Link
						href={{
							pathname: `${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/variant/create`,
							query: {
								productId: productId,
								productName: productName,
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
