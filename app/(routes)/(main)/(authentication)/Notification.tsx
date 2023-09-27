import React from 'react'
import { ToastContentProps, toast, ToastOptions } from 'react-toastify'
import Link from 'next/link'

export const notifyRegisterSuccess = () => {
	toast.success(<RegisterSuccessMessage />, {
		position: 'top-center',
	})
}
export const notifyRegisterFail = (errorMessage?: string) => {
	toast.error(<RegisterErrorMessage message={errorMessage ? errorMessage : undefined} />, {
		position: 'top-center',
	})
}
export const notifyLoginSuccess = () => {
	toast.success(<LoginSuccessMessage />, {
		position: 'top-center',
	})
}
export const notifyLoginFail = (errorMessage?: string) => {
	toast.error(<LoginErrorMessage message={errorMessage ? errorMessage : undefined} />, {
		position: 'top-center',
	})
}

export const notifyResetPasswordSuccess = (options?: ToastOptions) => {
	toast.success(<ResetPasswordSuccessMessage />, {
		position: 'top-center',
		onClose: options?.onClose,
	})
}
export const notifyResetPasswordFail = (errorMessage?: string, options?: ToastOptions) => {
	toast.error(<ResetPasswordErrorMessage message={errorMessage ? errorMessage : undefined} />, {
		position: 'top-center',
		onClose: options?.onClose,
	})
}

export const notifySendEmailFail = (errorMessage?: string) => {
	toast.error(<SendEmailErrorMessage message={errorMessage ? errorMessage : undefined} />, {
		position: 'top-center',
	})
}

const RegisterSuccessMessage = () => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-primary-625'>Registered Successfully</h3>
		<p>
			Moving to the{' '}
			<Link
				href={'../login'}
				className='hover:font-bold'
			>
				Login Page
			</Link>
		</p>
	</div>
)

const LoginSuccessMessage = () => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-primary-625'>Login Successfully</h3>
		<p>
			Let&apos;s go{' '}
			<Link
				href={'../login'}
				className='hover:font-bold'
			>
				Shopping!
			</Link>
		</p>
	</div>
)
const RegisterErrorMessage = ({ message }: { message?: string }) => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-status-error'>{message ? message : 'Registered Failed'}</h3>
	</div>
)

const LoginErrorMessage = ({ message }: { message?: string }) => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-status-error'>{message ? message : 'Login Failed'}</h3>
	</div>
)

const ResetPasswordSuccessMessage = () => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-primary-625'>Your Password Has Been Successfully Reset!</h3>
		<p>
			Let&apos;{' '}
			<Link
				href={'/login'}
				className='hover:font-bold'
			>
				Login Now!
			</Link>
		</p>
	</div>
)
const ResetPasswordErrorMessage = ({ message }: { message?: string }) => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		{message ? (
			<>
				<h3 className='capitalize text-status-error'>{message}</h3>
				<p>
					This current session has been expired.{' '}
					<Link
						href={'/forgot-password'}
						className='hover:font-bold'
					>
						Resend your email.
					</Link>
				</p>
			</>
		) : (
			'Reset Password Failed'
		)}
	</div>
)

const SendEmailErrorMessage = ({ message }: { message?: string }) => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-status-error'>{message ? message : 'Registered Failed'}</h3>
	</div>
)
