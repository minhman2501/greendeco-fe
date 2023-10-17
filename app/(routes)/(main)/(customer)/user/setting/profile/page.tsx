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

	if (userProfileQuery.data) return <UserProfileForm profile={userProfileQuery.data} />
	return <h1>lmao</h1>
}
