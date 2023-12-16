import { getOrderProductByOrderAsAdminstrator } from '@/app/_api/axios/admin/order'
import { OrderData, OrderProductData } from '@/app/_api/axios/order'
import { VariantData, getProductVariant } from '@/app/_api/axios/product'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { NOT_FOUND_IMAGE } from '@/app/_configs/constants/images'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import { useEffect } from 'react'

export default function VariantInformation(order: { order: OrderData['id'] }) {
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)
	const productQuery = useQuery({
		queryKey: [UseQueryKeys.Order, ADMIN_QUERY_KEY],
		queryFn: () => getOrderProductByOrderAsAdminstrator(adminAccessToken, order.order),
	})

	const { data, isLoading } = productQuery
	return (
		<div className='flex-col-start h-5/6 divide-y divide-primary-5555-40 overflow-y-auto rounded-[4px] '>
			{isLoading ||
				data?.items.map((value) => {
					return (
						<VariantInfor
							product={value}
							key={value.id}
						/>
					)
				})}
		</div>
	)
}

function VariantInfor(product: { product: OrderProductData }) {
	const productQuery = useQuery({
		queryKey: [UseQueryKeys.Variant, UseQueryKeys.Product, product.product.id],
		queryFn: () => getProductVariant(product.product.product_id, product.product.variant_id),
	})

	const { data, isLoading } = productQuery

	return (
		<>
			{isLoading || (
				<div className='flex w-full justify-between py-5'>
					<div className='flex w-full'>
						<div className='h-[60px] w-[60px] rounded-xl'>
							{data?.product === undefined ? (
								<Image
									width={90}
									height={90}
									src={NOT_FOUND_IMAGE}
									alt={product.product.variant_name}
									className='rounded-xl'
								/>
							) : (
								<Image
									width={90}
									height={90}
									src={data.product.images[0]}
									alt={product.product.variant_name}
									className='rounded-xl'
								/>
							)}
						</div>
						<div className='px-5'>
							<h1 className='text-2xl'>{product.product.variant_name}</h1>
							<div className='flex items-center justify-center'>
								<p>Pot:</p>
								{data?.variant === undefined ? (
									<div className='h-[] w-[28px] rounded-full bg-primary-580'></div>
								) : (
									<VariantColor variant={data.variant} />
								)}
							</div>
						</div>
					</div>
					<h1>${product.product.variant_price}</h1>
				</div>
			)}
		</>
	)
}

function VariantColor({ variant }: { variant: VariantData }) {
	const styles = `h-[28px] w-[28px] rounded-full bg-[${variant.color}] mx-2 px-2`
	return (
		<>
			<div className={styles}></div>
			<b className='text-2xl font-normal'>{variant.color_name}</b>
		</>
	)
}
