'use client'
import { TextField, Input } from '@/app/_components/form'
import Button from '@/app/_components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	CreateVariantSchema,
	CreateVariantFormInputType,
} from '@/app/_configs/schemas/createVariant'
import { useMutation } from '@tanstack/react-query'
import { createProduct } from '@/app/_api/axios/admin/product'
import { SIZE_OPTIONS, TYPE_OPTIONS, DIFFICULTY_OPTIONS } from '@/app/_configs/constants/variables'
import { useImageUploadStore } from '@/app/_configs/store/useImagesUploadStore'
import { getCookie } from 'cookies-next'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import Link from 'next/link'
import VariantImage from './VariantImage'

export default function CreateVariantForm() {
	const { isFulfilled, images, resetImages } = useImageUploadStore()
	const defaultInputValues: CreateVariantFormInputType = {
		name: '',
		image: '',
		color: '',
		is_default: false,
		available: false,
		price: '0',
		color_name: '',
		description: '',
	}

	//NOTE: Validation with useForm
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateVariantFormInputType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(CreateVariantSchema),
		defaultValues: defaultInputValues,
	})

	// const createProductMutation = useMutation({
	// 	//NOTE: The callback used for the mutation
	// 	mutationFn: createProduct,
	// 	//NOTE: Execuse after receiving suscess responses
	// 	onSuccess: (data) => {
	// 		handleResetForm()
	// 	},
	// 	//NOTE: Execuse after receving failure responses
	// 	/* onError: (e) => {
	// 		if (e instanceof AxiosError) {
	// 		}
	// 	}, */
	// })

	/* const onSubmitHandler: SubmitHandler<CreateProductFormInputType> = (values, e) => {
		e?.preventDefault()
		const adminAcessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
		console.log({
			...values,
			images: [...images],
		})
		createProductMutation.mutate({
			productData: { ...values, images: [...images] },
			adminAccessToken:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNzAwMzY3MjEzLCJ1c2VyX2lkIjoiM2NkNDZhOTUtNWFhYi00MTk1LTkzNTgtMzg1YWQ5YTMyZGU5In0.GS4aIFzscPOu6MWheBH4kfO2T3IqfJlxF6zpEUoxRnQ',
		})
	} */

	const handleResetForm = () => {
		resetImages()
		reset()
	}
	return (
		<form
			// onSubmit={handleSubmit(onSubmitHandler)}
			className='w-full'
		>
			<div className='grid w-full grid-cols-2 gap-comfortable'>
				<>
					<div className='flex-col-start gap-cozy text-body-md'>
						<div className='flex-1'>
							<TextField
								type='text'
								label='Variant Name'
								placeholder='The name is idealy should be plant name + color name'
								register={register('name')}
								error={Boolean(errors?.name)}
								helperText={errors?.name?.message}
							/>
						</div>
						<div className='flex-1'>
							<TextField
								type='text'
								label='Price'
								placeholder='Price of the variant'
								register={register('price')}
								error={Boolean(errors?.price)}
								helperText={errors?.price?.message}
							/>
						</div>
						<div className='flex-1'>
							<Input
								multiline
								{...register('description')}
							/>
							<span>{errors?.description?.message}</span>
						</div>
						<div className='flex flex-wrap gap-cozy'>
							<div>
								<TextField
									type='text'
									label='Pot Color'
									placeholder='HEX color code only'
									register={register('color')}
									error={Boolean(errors?.color)}
									helperText={errors?.color?.message}
								/>
							</div>

							<div>
								<TextField
									type='text'
									label='Pot Color Name'
									placeholder='Name of the pot'
									register={register('color_name')}
									error={Boolean(errors?.color_name)}
									helperText={errors?.color_name?.message}
								/>
							</div>
						</div>
						<div>
							<TextField
								type='checkbox'
								label='Set Default'
								placeholder='Lmao'
								register={register('is_default')}
								error={Boolean(errors?.is_default)}
								helperText={errors?.is_default?.message}
							/>
						</div>
						<div>
							<TextField
								type='checkbox'
								label='Set Avaiable'
								placeholder='Lmao'
								register={register('available')}
								error={Boolean(errors?.available)}
								helperText={errors?.available?.message}
							/>
						</div>
					</div>
				</>
				<div>
					<label>Product Images</label>
					<VariantImage />
				</div>
			</div>
			<div className='mt-cozy flex w-full justify-end gap-cozy'>
				<Button
					type='submit'
					// disabled={createProductMutation.isLoading || isFulfilled() === false}
				>
					{/* {createProductMutation.isLoading ? 'Creating...' : 'Create'} */}
				</Button>
				<Button
					className='btnSecondary'
					type='button'
					onClick={() => handleResetForm()}
					// disabled={createProductMutation.isLoading}
				>
					Cancel
				</Button>
			</div>
		</form>
	)
}
