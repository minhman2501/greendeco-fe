'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import Button from '@/app/_components/Button'
import { UserProfileFormInputType, UserProfileSchema } from '@/app/_configs/schemas/userProfile'
import UserAvatar from './UserAvatar'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { updatetUserProfile } from '@/app/_api/axios/user'

export default function UserProfileForm({ profile }: { profile: any }) {
	const [avatar, setAvatar] = useState<string>(profile.avatar)

	const queryClient = useQueryClient()

	console.log(avatar)

	const defaultInputValues: UserProfileFormInputType = {
		firstName: profile.firstName,
		lastName: profile.lastName,
		email: profile.email,
		phoneNumber: profile.phoneNumber,
	}

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm<UserProfileFormInputType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(UserProfileSchema),
		defaultValues: defaultInputValues,
	})

	const updateUserProfileMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: updatetUserProfile,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: (data) => {
			console.log(data)
			queryClient.invalidateQueries({ queryKey: ['user'] })
		},
		//NOTE: Execuse after receving failure responses
		onError: (e) => {
			if (e instanceof AxiosError) {
				console.log(e)
			}
		},
	})

	const onSubmitHandler: SubmitHandler<UserProfileFormInputType> = (values, e) => {
		e?.preventDefault()
		//NOTE: Execute the Mutation
		updateUserProfileMutation.mutate({
			avatar: avatar,
			email: values.email,
			firstName: values.firstName,
			lastName: values.lastName,
			phoneNumber: values.phoneNumber,
		})
	}
	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className='flex w-full flex-col gap-cozy text-body-sm'
			>
				<div className='flex-row-between gap-cozy'>
					<div className='flex-1'>
						<input
							type='text'
							placeholder='First Name'
							{...register('firstName')}
						/>
					</div>
					<div className='flex-1'>
						<input
							type='text'
							placeholder='Last Name'
							{...register('lastName')}
						/>
					</div>
				</div>
				<div>
					<input
						type='email'
						placeholder='Email'
						{...register('email')}
					/>
				</div>
				<div>
					<input
						type='tel'
						placeholder='Phone Number'
						{...register('phoneNumber')}
					/>
				</div>
				<Button
					disabled={
						!isDirty || avatar == profile.avatar || updateUserProfileMutation.isLoading
					}
					type='submit'
				>
					Edit
				</Button>
			</form>
			<UserAvatar
				avatar={profile.avatar}
				setAvatar={setAvatar}
			/>
		</>
	)
}
