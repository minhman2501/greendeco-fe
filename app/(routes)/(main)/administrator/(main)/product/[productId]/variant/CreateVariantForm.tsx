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
import { getCookie } from 'cookies-next'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import VariantImage from './VariantImage'
import LabelProvider from '@/app/_components/form/LabelProvider'
import { useState } from 'react'

export default function CreateVariantForm() {
	const [variantImage, setVariantImage] = useState<string | undefined>()
	const defaultInputValues: CreateVariantFormInputType = {
		name: '',
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

	const onSubmitHandler: SubmitHandler<CreateVariantFormInputType> = (values, e) => {
		e?.preventDefault()
		console.log({
			...values,
			variantImage,
		})
		/* createProductMutation.mutate({
			productData: { ...values, images: [...images] },
			adminAccessToken:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNzAwMzY3MjEzLCJ1c2VyX2lkIjoiM2NkNDZhOTUtNWFhYi00MTk1LTkzNTgtMzg1YWQ5YTMyZGU5In0.GS4aIFzscPOu6MWheBH4kfO2T3IqfJlxF6zpEUoxRnQ',
		}) */
	}

	const handleResetForm = () => {
		reset()
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmitHandler)}
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
						<div>
							<LabelProvider
								label='Color'
								className='items-center'
							>
								<input
									className=' h-[40px] w-[40px]'
									type='color'
									{...register('color')}
								/>
							</LabelProvider>
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
						<div>
							<LabelProvider label='Default'>
								<input
									aria-label='set-default-variant'
									type='checkbox'
									className='h-full'
									placeholder='Default Variant'
									{...register('is_default')}
								/>
							</LabelProvider>
						</div>
						<div>
							<LabelProvider label='Avaiable'>
								<input
									aria-label='set-variant-available'
									type='checkbox'
									placeholder='Variant Available'
									{...register('available')}
								/>
							</LabelProvider>
						</div>
					</div>
				</>
				<div className='text-body-md'>
					<LabelProvider
						label='Variant Image'
						direction='vertical'
					>
						<VariantImage
							image={variantImage}
							setImage={setVariantImage}
						/>
					</LabelProvider>
				</div>
			</div>
			<div className='mt-cozy flex w-full justify-end gap-cozy'>
				<Button
					type='submit'
					disabled={variantImage === undefined}
				>
					{/* {createProductMutation.isLoading ? 'Creating...' : 'Create'} */}
					Create
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
