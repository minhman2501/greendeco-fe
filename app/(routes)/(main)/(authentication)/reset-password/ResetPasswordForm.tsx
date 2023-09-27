'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	ResetPasswordFormInputType,
	ResetPasswordSchema,
} from '@/app/_configs/schemas/authentication'
import { useMutation } from '@tanstack/react-query'
import { registerAccount, resetPassword } from '@/app/_api/axios/authentication'
import { AxiosError } from 'axios'
import { notifyRegisterFail, notifyRegisterSuccess } from '../Notification'
import { TextField } from '@/app/_components/form'
import Button from '@/app/_components/Button'

export default function ResetPasswordForm({ resetPasswordToken }: { resetPasswordToken: string }) {
	const defaultInputValues: ResetPasswordFormInputType = {
		password: '',
		passwordConfirm: '',
	}

	//NOTE: Validation with useForm
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordFormInputType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: defaultInputValues,
	})

	const resetPasswordMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: resetPassword,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: () => {
			reset()
			console.log('sucess')
		},
		//NOTE: Execuse after receving failure responses
		onError: (e) => {
			if (e instanceof AxiosError) {
				console.log(e.response?.data.msg || e.message)
			}
		},
	})

	const onSubmitHandler: SubmitHandler<ResetPasswordFormInputType> = (values, e) => {
		e?.preventDefault()
		//NOTE: Execute the Mutation
		resetPasswordMutation.mutate({
			password: values.password,
			token: resetPasswordToken,
		})
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className='flex w-full flex-col gap-cozy text-body-sm'
			>
				<TextField
					type='password'
					label='New Password'
					placeholder='Your new password'
					register={register('password')}
					error={Boolean(errors?.password)}
					helperText={errors?.password?.message}
				/>
				<TextField
					type='password'
					label='Confirm New Password'
					placeholder='Confirm your new password'
					register={register('passwordConfirm')}
					error={Boolean(errors?.passwordConfirm)}
					helperText={errors?.passwordConfirm?.message}
				/>
				<Button
					type='submit'
					disabled={resetPasswordMutation.isLoading}
				>
					{resetPasswordMutation.isLoading ? 'Sending...' : 'Reset Password'}
				</Button>
			</form>
		</>
	)
}
