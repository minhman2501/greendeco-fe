'use client'
import React, { Dispatch, useState } from 'react'
import Image from 'next/image'
import { AxiosError } from 'axios'
import { DEFAULT_AVATAR } from '@/app/_configs/constants/images'
import { useMutation } from '@tanstack/react-query'
import { uploadImage } from '@/app/_api/axios/media'

export default function UserAvatar({
	avatar,
	setAvatar,
}: {
	avatar: any
	setAvatar: Dispatch<any>
}) {
	const [currentImage, setCurrentImage] = useState(avatar)

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.target.files && handleChange(event.target.files[0])
	}

	const imageUploadMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: uploadImage,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: (data) => {
			setCurrentImage(data)
			setAvatar(data)
		},
		//NOTE: Execuse after receving failure responses
		onError: (e) => {
			if (e instanceof AxiosError) {
				console.log(e)
			}
		},
	})

	function handleChange(imageFile: File) {
		const formData = new FormData()
		formData.append('image', imageFile)
		imageUploadMutation.mutate(formData)
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
