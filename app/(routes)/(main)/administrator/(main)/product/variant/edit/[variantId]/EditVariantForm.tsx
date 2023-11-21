'use client'
import { TextField, Input } from '@/app/_components/form'
import Button from '@/app/_components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	CreateVariantSchema,
	CreateVariantFormInputType,
} from '@/app/_configs/schemas/createVariant'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { AxiosError } from 'axios'
import LabelProvider from '@/app/_components/form/LabelProvider'
import VariantImage from '../../VariantImage'
import { useState } from 'react'
import { VariantData } from '@/app/_api/axios/product'
import { updateVariant } from '@/app/_api/axios/admin/product'
import { ADMINISTRATOR_ROUTE, VARIANT_CURRENCY } from '@/app/_configs/constants/variables'
import { notifyUpdateVariantSuccess } from '../../../Notifications'
import { useRouter } from 'next/navigation'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'

export default function EditVariantForm(variant: VariantData) {
	const queryClient = useQueryClient()
	const router = useRouter()

	const [variantImage, setVariantImage] = useState<VariantData['image'] | undefined>(
		variant.image,
	)
	const defaultInputValues: CreateVariantFormInputType = {
		color: variant.color,
		is_default: false,
		available: variant.available,
		price: variant.price,
		color_name: variant.color_name,
		description: variant.description,
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

	const updateVariantMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: updateVariant,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: (data) => {
			notifyUpdateVariantSuccess()
			queryClient.invalidateQueries({
				queryKey: [UseQueryKeys.Variant, ADMIN_QUERY_KEY, variant.product],
			})
			router.replace(`${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/${variant.product}`)
		},
		//NOTE: Execuse after receving failure responses
		onError: (e) => {
			if (e instanceof AxiosError) {
				console.log(e)
			}
		},
	})

	const onSubmitHandler: SubmitHandler<CreateVariantFormInputType> = (values, e) => {
		e?.preventDefault()
		console.log({
			...values,
			variantImage,
		})
		const { price, color_name, ...restValues } = values

		if (variantImage) {
			updateVariantMutation.mutate({
				variantData: {
					...restValues,
					id: variant.id,
					product_id: variant.product,
					name: ` ${color_name}`,
					color_name: color_name,
					price: parseInt(price),
					image: variantImage,
					currency: VARIANT_CURRENCY,
				},
				adminAccessToken:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNzAwNTc2NzA2LCJ1c2VyX2lkIjoiM2NkNDZhOTUtNWFhYi00MTk1LTkzNTgtMzg1YWQ5YTMyZGU5In0.VX-HfeXDgoHtNeu1thWBAiwGg7oBlhJPVJkh5AduwU4',
			})
		}
	}

	const handleResetForm = () => {
		reset()
		setVariantImage(variant.image)
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmitHandler)}
			className='w-full'
		>
			<div className='grid w-full grid-cols-2 gap-comfortable'>
				<>
					<div className='flex-col-start gap-cozy text-body-md'>
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
					{updateVariantMutation.isLoading ? 'Creating...' : 'Save'}
				</Button>
				<Button
					className='btnSecondary'
					type='button'
					onClick={() => handleResetForm()}
					disabled={updateVariantMutation.isLoading}
				>
					Cancel
				</Button>
			</div>
		</form>
	)
}
