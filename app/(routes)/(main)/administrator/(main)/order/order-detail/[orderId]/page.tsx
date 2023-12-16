'use client'
import { OrderState, getOrderByIdAsAdminstrator } from '@/app/_api/axios/admin/order'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import OrderDropdownState from '../../DropdownState'
import { OrderData } from '@/app/_api/axios/order'
import Image from 'next/image'
import { GetUserById } from '@/app/_api/axios/admin/user'
import { DEFAULT_AVATAR } from '@/app/_configs/constants/images'
import OrderInformationWrapper from './OrderInformation'
import VariantInformation from './VariantInformation'
import { TailSpin } from 'react-loader-spinner'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'

export default function OrderDetailManagementPage({
	params,
}: {
	params: {
		orderId: string
	}
}) {
	const { orderId } = params
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
	const orderQuery = useQuery({
		queryKey: [UseQueryKeys.Order, ADMIN_QUERY_KEY, orderId],
		queryFn: () => getOrderByIdAsAdminstrator(adminAccessToken, orderId),
	})

	const { data, isSuccess, isLoading } = orderQuery
	return (
		<>
			{' '}
			{isLoading && (
				<div className='flex w-full items-center justify-center'>
					<TailSpin
						height='200'
						width='200'
						color='#4fa94d'
						ariaLabel='tail-spin-loading'
						radius='1'
						wrapperStyle={{}}
						wrapperClass=''
						visible={true}
					/>
				</div>
			)}
			{isSuccess && <ContentWrapper order={data!.items} />}
		</>
	)
}

function ContentWrapper({ order }: { order: OrderData }) {
	const orderDropDown: OrderState = {
		owner_id: order.owner_id,
		order_id: order.id,
		state: order.state,
	}

	return (
		<div className='flex-col-start mx-5 min-h-full w-full gap-cozy py-comfortable '>
			<div className='flex h-full items-center'>
				<h2 className='text-2xl'>Order Status </h2>
				<div className='mx-5'>
					<OrderDropdownState order={orderDropDown} />
				</div>
			</div>
			<div className='flex'>
				<UserWrapper order={order} />
				<div className='min-h-full w-6/12 flex-col divide-y divide-primary-5555-40 rounded-[4px] bg-neutral-gray-1 p-cozy '>
					<VariantInformation order={order.id} />
					<OrderInformationWrapper order={order} />
				</div>
			</div>
		</div>
	)
}

function UserWrapper({ order }: { order: OrderData }) {
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)
	const userQuery = useQuery({
		queryKey: [UseQueryKeys.Order, ADMIN_QUERY_KEY, order.owner_id],
		queryFn: () => GetUserById(adminAccessToken, order.owner_id),
	})
	const { data, isLoading } = userQuery
	return (
		<div className='flex h-full w-6/12 flex-col rounded-lg border border-primary-625-80 p-8'>
			<div className='flex items-center px-5 pb-5 text-xl'>
				<div className='h-[90px] w-[90px] rounded-full bg-order-status-draft'>
					{isLoading || (
						<Image
							width={90}
							height={90}
							alt='test'
							className='rounded-full'
							style={{ objectFit: 'fill' }}
							src={data?.avatar != null ? data!.avatar : DEFAULT_AVATAR}
						/>
					)}
				</div>
				<h4 className='p-5 font-semibold'>Full Name: </h4>
				<p className='text-2xl'>{order.user_name}</p>
			</div>
			<div className='flex items-center text-xl'>
				<h4 className='p-5 font-semibold'>Phone Number:</h4>
				<p className='text-2xl'>{order.user_phone_number}</p>
			</div>
			<div className='flex items-center text-xl'>
				<h4 className='p-5 font-semibold'>Shipping Address: </h4>
				<p className='text-2xl'>{order.shipping_address}</p>
			</div>
		</div>
	)
}
