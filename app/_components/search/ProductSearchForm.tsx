'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@/app/_components/form'
import Button from '@/app/_components/Button'
import { ProductSearchFormInputType, ProductSearchSchema } from '@/app/_configs/schemas/search'
import useQueryParams from '@/app/_hooks/useQueryParams'
import { SHOP_ROUTE } from '@/app/_configs/constants/variables'

type QueryParams = {
	field: string | null
}

export default function ProductSearchForm() {
	const { directToPathWithQueryParams } = useQueryParams<QueryParams>()
	const defaultInputValues: ProductSearchFormInputType = {
		search: '',
	}

	//NOTE: Validation with useForm
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<ProductSearchFormInputType>({
		mode: 'all',
		reValidateMode: 'onBlur',
		resolver: zodResolver(ProductSearchSchema),
		defaultValues: defaultInputValues,
	})

	const onSubmitHandler: SubmitHandler<ProductSearchFormInputType> = (value, e) => {
		e?.preventDefault()
		//NOTE: Execute the Mutation
		directToPathWithQueryParams(
			{ field: JSON.stringify({ name: value.search }) },
			SHOP_ROUTE.SEARCH.LINK,
		)
	}
	return (
		<div className='flex-col-start w-full items-center justify-center gap-compact p-cozy'>
			<span className='text-body-md font-semi-bold text-primary-5555'>
				What do you have in mind?
			</span>
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className='flex w-full items-center gap-cozy text-body-sm'
			>
				<TextField
					className='flex-1'
					type='text'
					placeholder='Enter Your Plant'
					register={register('search')}
					error={false}
				/>
				<Button
					disabled={!isDirty || isValid === false}
					type='submit'
					className='rounded-[8px] px-comfortable font-semi-bold'
				>
					Search
				</Button>
			</form>
		</div>
	)
}
