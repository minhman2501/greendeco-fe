'use client'
import Button from '@/app/_components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useMutation } from '@tanstack/react-query'
import { createProduct } from '@/app/_api/axios/admin/product'
import { getCookie } from 'cookies-next'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { MultilineTextField } from '@/app/_components/form/MultiplelineTextField'
import { ReviewFormInputType, ReviewSchema } from '@/app/_configs/schemas/review'
import { error } from 'console'

export default function CreateReviewForm() {
	const defaultInputValues: ReviewFormInputType = {
		review: '',
		star: 0,
	}

	//NOTE: Validation with useForm
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ReviewFormInputType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(ReviewSchema),
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

	const onSubmitHandler: SubmitHandler<ReviewFormInputType> = (values, e) => {
		e?.preventDefault()
		const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
		console.log(values)
	}

	const handleResetForm = () => {
		reset()
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmitHandler)}
			className='w-full'
		>
			<>
				<div className='flex-col-start gap-cozy text-body-md'>
					<div className='flex gap-cozy'>
						<input
							{...register('star')}
							type='radio'
							value={1}
							id='field-1-star'
						></input>
						<input
							{...register('star')}
							type='radio'
							value={2}
							id='field-1-star'
						></input>
						<input
							{...register('star')}
							type='radio'
							value={3}
							id='field-1-star'
						></input>
						<input
							{...register('star')}
							type='radio'
							value={4}
							id='field-1-star'
						></input>
						<input
							{...register('star')}
							type='radio'
							value={5}
							id='field-1-star'
						></input>
					</div>
					{errors.star && <p>{errors.star.message}</p>}
					<div className='flex-1'>
						<MultilineTextField
							label='Product Description'
							placeholder='Product Description'
							className='h-[200px]'
							register={register('review')}
							error={Boolean(errors?.review)}
							helperText={errors?.review?.message}
						/>
					</div>
					<div className='mt-cozy flex w-full justify-end gap-cozy'>
						<Button
							type='submit'
							disabled={createProductMutation.isLoading}
						>
							{createProductMutation.isLoading ? 'Creating...' : 'Create'}
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
				</div>
			</>
		</form>
	)
}
