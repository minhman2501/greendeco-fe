'use client'
import { getUserProfile } from '@/app/_api/axios/user'
import { useQuery } from '@tanstack/react-query'
import UserProfileForm from './UserProfileForm'

export default function UserProfilePage() {
	const userProfileQuery = useQuery({
		queryKey: ['user'],
		queryFn: getUserProfile,
		onError: () => console.log('Please re login'),
	})

	userProfileQuery.data && console.log(userProfileQuery.data)

	return (
		<div className='flex-col-start gap-compact'>
			<h1 className='text-heading-3'>Account Preference</h1>
			<div className='p-cozy'>
				{userProfileQuery.isSuccess && <UserProfileForm profile={userProfileQuery.data} />}
			</div>
		</div>
	)
}
