'use client'
import { useMutation } from '@tanstack/react-query'
import { uploadImage } from '@/app/_api/axios/media'
import { IMAGE_MAX_SIZE_IN_MB } from '@/app/_configs/constants/variables'
import React, { Dispatch } from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

type ImageUploadProps = {
	images: string[]
	setImages: Dispatch<string[]>
}

export default function ImageUploadGrid({ images, setImages }: ImageUploadProps) {
	return (
		<div className='grid grid-cols-3 gap-compact'>
			{images.map((image) => (
				<ImageUploadInput
					key={image}
					image={image}
					setImages={setImages}
				/>
			))}
		</div>
	)
}

function ImageUploadInput({ image, setImages }: { image: string; setImages: Dispatch<string[]> }) {
	const imageUploadMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: uploadImage,
		onSuccess: (data) => console.log('success', data),
		//NOTE: Execuse after receiving suscess responses
	})

	function handleImageChange(imageFile: File) {
		validateImageSize(imageFile).then(() => {
			const formData = new FormData()
			formData.append('image', imageFile)

			imageUploadMutation.mutate(formData)
		})
	}

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.target.files && handleImageChange(event.target.files[0])
	}

	return (
		<div className='aspect-square'>
			<label
				htmlFor='upload-photo'
				className='block h-full w-full cursor-pointer'
			>
				{image ? (
					<Image
						width={0}
						height={0}
						sizes='100vw'
						src={image}
						alt='product image'
					></Image>
				) : (
					<span className='flex-center h-full w-full bg-neutral-gray-4'>
						<PhotoIcon className='aspect-square h-[30px]' />
					</span>
				)}
			</label>
			<input
				className='hidden'
				type='file'
				id='upload-photo'
				accept='image/*'
				onChange={onFileChange}
			/>
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
