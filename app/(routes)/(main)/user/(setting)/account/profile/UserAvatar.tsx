import React, { Dispatch, useEffect, useState } from 'react'
import Image from 'next/image'
import { AxiosError } from 'axios'
import { DEFAULT_AVATAR } from '@/app/_configs/constants/images'
import { useMutation } from '@tanstack/react-query'
import { uploadImage } from '@/app/_api/axios/media'
import { UserProfileResponseData } from '@/app/_api/axios/user'
import { IMAGE_MAX_SIZE_IN_MB } from '@/app/_configs/constants/variables'

function UserAvatar({
	avatar,
	setAvatar,
}: {
	avatar: UserProfileResponseData['avatar']
	setAvatar: Dispatch<UserProfileResponseData['avatar']>
}) {
	const [currentImage, setCurrentImage] = useState(avatar)

	useEffect(() => {
		setAvatar(currentImage)
	}, [currentImage, setAvatar])

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.target.files && handleImageChange(event.target.files[0])
	}

	const imageUploadMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: uploadImage,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: (data) => {
			setCurrentImage(data)
		},
		//NOTE: Execuse after receving failure responses
		onError: (e) => {
			if (e instanceof AxiosError) {
				console.log(e)
			}
		},
	})

	function handleImageChange(imageFile: File) {
		validateImageSize(imageFile)
			.then(() => {
				const formData = new FormData()
				formData.append('image', imageFile)

				imageUploadMutation.mutate(formData)
			})
			.catch((error) => console.log(error))
	}

	return (
		<div className='w-[300px]'>
			<Image
				width={30}
				height={30}
				src={currentImage ? currentImage : DEFAULT_AVATAR}
				alt='user avatar'
			></Image>
			<input
				type='file'
				accept='image/*'
				onChange={onFileChange}
			></input>
		</div>
	)
}

function validateImageSize(image: File) {
	const maxSize = IMAGE_MAX_SIZE_IN_MB * 1000 * 1024

	return new Promise((resolve, rejects) => {
		if (image.size < maxSize) {
			resolve(image)
		} else rejects(`Image size must be lower than ${IMAGE_MAX_SIZE_IN_MB} MB`)
	})
}

export default React.memo(UserAvatar)
