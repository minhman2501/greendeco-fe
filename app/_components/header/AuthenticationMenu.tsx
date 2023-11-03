'use client'

import Image from 'next/image'
import { UserProfileResponseData, getUserProfile } from '@/app/_api/axios/user'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { DEFAULT_AVATAR } from '@/app/_configs/constants/images'

export default function AuthenticationHandler() {
	const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)
	const router = useRouter()

	const userQuery = useQuery({
		queryKey: [UseQueryKeys.User],
		queryFn: () => getUserProfile(accessToken),
		retry: false,
	})

	const { data, isLoading, isSuccess, isError } = userQuery

	return (
		<div className='h-full w-[220px] overflow-hidden rounded-[8px] bg-primary-625 shadow-30'>
			{isSuccess && <UserSettingMenu {...data} />}
			{isError && (
				<Button
					className='h-full px-[20px]'
					onClick={() => router.push('/login')}
				>
					Login
				</Button>
			)}
		</div>
	)
}

function UserSettingMenu({ avatar, firstName, lastName }: UserProfileResponseData) {
	return (
		<span className='flex h-full max-w-full items-center justify-center gap-compact px-cozy py-[12px] '>
			<span className='aspect-square h-full overflow-hidden rounded-[100%]'>
				<Image
					width={0}
					height={0}
					sizes='100vw'
					src={avatar ? avatar : DEFAULT_AVATAR}
					alt='user avatar'
				></Image>
			</span>
			<span className='flex-1 truncate text-body-md font-semi-bold text-white'>
				{firstName} {lastName}
			</span>
			<ChevronDownIcon className='aspect-square h-[24px] text-white' />
		</span>
	)
}
