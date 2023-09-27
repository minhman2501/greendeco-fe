'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema, RegisterFormInputType } from '@/app/_configs/schemas/authentication'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '@/app/_api/axios/authentication'
import { AxiosError } from 'axios'
import { notifyRegisterFail, notifyRegisterSuccess } from '../Notification'
import { TextField } from '@/app/_components/form'
import Button from '@/app/_components/Button'

export default function ForgotPasswordForm() {
	return (
		<>
			<form className='flex w-full flex-col gap-cozy text-body-sm'>
				<div>
					<TextField
						type='email'
						label='Email'
						placeholder='Your Email'
					/>
				</div>
				<Button type='submit'>Send Email</Button>
			</form>
		</>
	)
}
