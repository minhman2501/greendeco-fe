'use client'
import { OrderState, getOrderFullDetailAsAdministratorById } from '@/app/_api/axios/admin/order'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import OrderDropdownState from '../../DropdownState'
import { OrderData, OrderFullDetailData } from '@/app/_api/axios/order'
import Image from 'next/image'
import { GetUserById } from '@/app/_api/axios/admin/user'
import { DEFAULT_AVATAR } from '@/app/_configs/constants/images'
import OrderInformationWrapper from './OrderInformation'
import VariantInformation from './VariantInformation'
import { TailSpin } from 'react-loader-spinner'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

export default function OrderDetailManagementPage({
	params,
}: {
	params: {
		orderId: string
	}
}) {
	const { orderId } = params
	const orderQuery = useQuery({
		queryKey: [UseQueryKeys.Order, ADMIN_QUERY_KEY, orderId],
		queryFn: () => getOrderFullDetailAsAdministratorById(orderId),
	})

	const { data, isSuccess, isLoading, isError } = orderQuery
	return (
		<>
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
			{isSuccess && <ContentWrapper order={data!} />}
			{isError && <ErrorMessage />}
		</>
	)
}

function ContentWrapper({ order }: { order: OrderFullDetailData }) {
	const router = useRouter()
	const orderDropDown: OrderState = {
		owner_id: order.order.owner_id,
		order_id: order.order.id,
		state: order.order.state,
	}

	return (
		<>
			<span
				className='my-5 text-xl underline hover:cursor-pointer hover:font-bold'
				onClick={() => router.back()}
			>
				Go back
			</span>
			<h1 className='font-semi-bold text-primary-418'>Manage Detail</h1>

			<div className='flex-col-start mx-5 min-h-full w-full gap-cozy py-comfortable '>
				<div className='flex h-full items-center'>
					<h2 className='text-2xl'>Order Status </h2>
					<div className='mx-5'>
						<OrderDropdownState order={orderDropDown} />
					</div>
				</div>
				<div className='flex'>
					<UserWrapper order={order.order} />
					<div className='min-h-full w-6/12 flex-col divide-y divide-primary-5555-40 rounded-[4px] bg-neutral-gray-1 p-cozy '>
						<VariantInformation order={order.productList} />
						<OrderInformationWrapper order={order} />
					</div>
				</div>
			</div>
		</>
	)
}

function UserWrapper({ order }: { order: OrderData }) {
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)
	const userQuery = useQuery({
		queryKey: [UseQueryKeys.Order, ADMIN_QUERY_KEY, order.owner_id, order.id],
		queryFn: () => GetUserById(adminAccessToken, order.owner_id),
	})
	const { data, isLoading } = userQuery
	return (
		<div className='flex h-full w-6/12 flex-col rounded-lg border border-primary-625-80 p-8'>
			<div className='flex items-center px-5 pb-5 text-xl'>
				<div className='h-[90px] w-[90px] rounded-full bg-primary-580'>
					{isLoading || (
						<Image
							width={90}
							height={90}
							alt='user image'
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

function ErrorMessage() {
	const router = useRouter()
	return (
		<div className='flex h-[200px] w-full items-center justify-center text-status-error'>
			<span className='flex-col-center gap-compact'>
				<ExclamationTriangleIcon className='aspect-square h-[80px]' />

				<span className='flex items-center gap-compact text-body-md'>
					<p className=' font-semi-bold'>Oops, something went wrong!</p>
					<span
						className='font-regular  underline hover:cursor-pointer hover:font-bold'
						onClick={() => router.back()}
					>
						Go back?
					</span>
				</span>
			</span>
		</div>
	)
}
