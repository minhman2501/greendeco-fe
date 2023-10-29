import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/app/_components/Button'
import { Input } from '@/app/_components/form'
import { ReviewInputType, ReviewSchema } from '@/app/_configs/schemas/review'
export default function CommentForm() {
	const defaultInputValues: ReviewInputType = {
		review: '',
		star: 0,
	}

	//NOTE: Validation with useForm
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ReviewInputType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(ReviewSchema),
		defaultValues: defaultInputValues,
	})

	return (
		<>
			<form className='flex w-full flex-col gap-cozy text-body-sm'>
				<div>
					<div></div>
					<textarea
						rows={3}
						placeholder='Leave the comment'
						className='border pt-cozy'
						{...register('review')}
					/>
				</div>
				<Button>Send</Button>
			</form>
		</>
	)
}
