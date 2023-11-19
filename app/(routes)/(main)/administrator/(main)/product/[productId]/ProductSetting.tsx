'use client'
import { TextField, Input } from '@/app/_components/form'
import Button from '@/app/_components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	ProductDetailSchema,
	ProductDetailFormInputType,
} from '@/app/_configs/schemas/createProduct'
import { useMutation } from '@tanstack/react-query'
import { createProduct } from '@/app/_api/axios/admin/product'
import { SIZE_OPTIONS, TYPE_OPTIONS, DIFFICULTY_OPTIONS } from '@/app/_configs/constants/variables'
import ImagesUploadGrid from '../create/ImagesUploadGrid'
import { useImageUploadStore } from '@/app/_configs/store/useImagesUploadStore'
import { getCookie } from 'cookies-next'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { ProductData } from '@/app/_api/axios/product'
import { useEffect } from 'react'

export default function ProductEditingForm({ product }: { product: ProductData }) {
	const { isFulfilled, images, setImages } = useImageUploadStore()

	const initImages: ProductData['images'] = product.images

	useEffect(() => {
		setImages(initImages)
	}, [])

	const defaultInputValues: ProductDetailFormInputType = {
		name: product.name,
		size: product.size,
		type: product.type,
		light: product.light,
		water: product.water,
		difficulty: product.difficulty,
		detail: product.detail,
		description: product.description,
	}

	//NOTE: Validation with useForm
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm<ProductDetailFormInputType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(ProductDetailSchema),
		defaultValues: defaultInputValues,
	})

	const createProductMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: createProduct,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: (data) => {
			handleResetForm()
		},
		//NOTE: Execuse after receving failure responses
		/* onError: (e) => {
			if (e instanceof AxiosError) {
			}
		}, */
	})

	const onSubmitHandler: SubmitHandler<ProductDetailFormInputType> = (values, e) => {
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
								label='Product Name'
								placeholder='The name of the product'
								register={register('name')}
								error={Boolean(errors?.name)}
								helperText={errors?.name?.message}
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
								<select {...register('type')}>
									{TYPE_OPTIONS.map((option) => (
										<option
											key={option}
											value={option}
										>
											{option}
										</option>
									))}
								</select>
							</div>
							<div>
								<select {...register('size')}>
									{SIZE_OPTIONS.map((option) => (
										<option
											key={option}
											value={option}
										>
											{option}
										</option>
									))}
								</select>
							</div>
							<div>
								<select {...register('difficulty')}>
									{DIFFICULTY_OPTIONS.map((option) => (
										<option
											key={option}
											value={option}
										>
											{option}
										</option>
									))}
								</select>
							</div>
							<div>
								<TextField
									type='text'
									label='Watering condition'
									placeholder=''
									register={register('water')}
									error={Boolean(errors?.water)}
									helperText={errors?.water?.message}
								/>
							</div>

							<div>
								<TextField
									type='text'
									label='Light Condition'
									placeholder=''
									register={register('light')}
									error={Boolean(errors?.light)}
									helperText={errors?.light?.message}
								/>
							</div>
						</div>
						<div>
							<TextField
								type='text'
								label='Detail of the product'
								placeholder=''
								register={register('detail')}
								error={Boolean(errors?.detail)}
								helperText={errors?.detail?.message}
							/>
						</div>
					</div>
				</>
				<div>
					<label>Product Images</label>
					<ImagesUploadGrid />
				</div>
			</div>
			<div className='mt-cozy flex w-full justify-end gap-cozy'>
				<Button
					type='submit'
					disabled={
						createProductMutation.isLoading ||
						isFulfilled() === false ||
						(!isDirty && images === initImages)
					}
				>
					{createProductMutation.isLoading ? 'Saving...' : 'Save'}
				</Button>
				<Button
					className='btnSecondary'
					type='button'
					onClick={() => handleResetForm()}
					disabled={createProductMutation.isLoading}
				>
					Cancel
				</Button>
			</div>
		</form>
	)
}
