'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	ShippingAddressSchema,
	ShippingAddressFormInputType,
} from '@/app/_configs/schemas/shippingAddress'
import { useMutation } from '@tanstack/react-query'
import { createOrder } from '@/app/_api/axios/order'
import { AxiosError } from 'axios'
import { TextField } from '@/app/_components/form'
import Button from '@/app/_components/Button'

export default function ShippingDetailForm() {
	const defaultInputValues: ShippingAddressFormInputType = {
		city: '',
		district: '',
		ward: '',
		address: '',
	}

	//NOTE: Validation with useForm
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ShippingAddressFormInputType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(ShippingAddressSchema),
		defaultValues: defaultInputValues,
	})

	const createOrderMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: createOrder,
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

	const onSubmitHandler: SubmitHandler<ShippingAddressFormInputType> = (values, e) => {
		e?.preventDefault()
		//NOTE: Execute the Mutation
	}
	return (
		<div className='flex-col-start gap-cozy'>
			<h2>Delivery Information</h2>
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className='flex-col-start gap-cozy'
			>
				<div className='grid grid-cols-2 gap-cozy text-body-sm'>
					<div>
						<TextField
							type='text'
							label='City'
							placeholder='City'
							register={register('city')}
							error={Boolean(errors?.city)}
							helperText={errors?.city?.message}
						/>
					</div>
					<div>
						<TextField
							type='text'
							label='District'
							placeholder='District'
							register={register('district')}
							error={Boolean(errors?.district)}
							helperText={errors?.district?.message}
						/>
					</div>
					<div>
						<TextField
							type='text'
							label='Ward'
							placeholder='Ward'
							register={register('ward')}
							error={Boolean(errors?.ward)}
							helperText={errors?.ward?.message}
						/>
					</div>
					<div>
						<TextField
							type='text'
							label='Address'
							placeholder='Address'
							register={register('address')}
							error={Boolean(errors?.address)}
							helperText={errors?.address?.message}
						/>
					</div>
				</div>
				<Button
					type='submit'
					disabled={createOrderMutation.isLoading}
				>
					{createOrderMutation.isLoading ? 'Processing...' : 'Confirm Checkout'}
				</Button>
			</form>
		</div>
	)
}
