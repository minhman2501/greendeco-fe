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

export default function CreateProductForm() {
	const defaultInputValues: CreateProductFormInputType = {
		name: '',
		size: '',
		type: '',
		light: '',
		water: '',
		difficulty: '',
		detail: '',
		description: '',
		images: [],
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
		//NOTE: Execute the Mutation
	}
	return (
		<form
			// onSubmit={}
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
								placeholder='Product description must have at least 20 characters'
								className='min-h-[300px]'
								{...register('description')}
							/>
						</div>
						<div className='flex flex-wrap gap-cozy'>
							<div>
								<TextField
									type='text'
									label='Type of plant'
									placeholder=''
									register={register('type')}
									error={Boolean(errors?.type)}
									helperText={errors?.type?.message}
								/>
							</div>
							<div>
								<TextField
									type='text'
									label='Size'
									placeholder=''
									register={register('size')}
									error={Boolean(errors?.size)}
									helperText={errors?.size?.message}
								/>
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
									label='Caring Difficulty'
									placeholder=''
									register={register('difficulty')}
									error={Boolean(errors?.difficulty)}
									helperText={errors?.difficulty?.message}
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
					<input
						type='file'
						id='upload-photo'
						accept='image/*'
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
