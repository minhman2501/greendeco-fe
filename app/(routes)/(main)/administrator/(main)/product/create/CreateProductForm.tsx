'use client'
import { TextField, Input } from '@/app/_components/form'
import Button from '@/app/_components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	CreateProductSchema,
	CreateProductFormInputType,
} from '@/app/_configs/schemas/createProduct'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '@/app/_api/axios/authentication'
import { AxiosError } from 'axios'
import { SIZE_OPTIONS, TYPE_OPTIONS, DIFFICULTY_OPTIONS } from '@/app/_configs/constants/variables'
import { error } from 'console'
import { useState } from 'react'
import ImageUploadGrid from './ImagesUploadGrid'

export default function CreateProductForm() {
	const [images, setImages] = useState<string[]>(['', '', ''])
	const defaultInputValues: CreateProductFormInputType = {
		name: '',
		size: SIZE_OPTIONS[0],
		type: TYPE_OPTIONS[0],
		light: '',
		water: '',
		difficulty: DIFFICULTY_OPTIONS[0],
		detail: '',
		description: '',
	}

	//NOTE: Validation with useForm
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateProductFormInputType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(CreateProductSchema),
		defaultValues: defaultInputValues,
	})

	const registerMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: registerAccount,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: () => {
			reset()
		},
		//NOTE: Execuse after receving failure responses
		/* onError: (e) => {
			if (e instanceof AxiosError) {
			}
		}, */
	})

	const onSubmitHandler: SubmitHandler<CreateProductFormInputType> = (values, e) => {
		e?.preventDefault()
		console.log(values)

		//NOTE: Execute the Mutation
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
					<ImageUploadGrid
						images={images}
						setImages={setImages}
					/>
				</div>
			</div>
			<Button
				type='submit'
				// disabled={registerMutation.isLoading}
			>
				{/* {registerMutation.isLoading ? 'Sending...' : 'Sign Up'} */}
				Lmao
			</Button>
		</form>
	)
}
