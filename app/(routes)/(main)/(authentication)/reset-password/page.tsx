import Link from 'next/link'
import ResetPasswordForm from './ResetPasswordForm'

export default function RegisterPage() {
	return (
		<>
			<div className='flex-col-start gap-common'>
				<div>
					<div className='flex-col-start gap-[4px]'>
						<h1>Reset Password</h1>
						<p className='text-body-md'>Enter your new password.</p>
					</div>
				</div>
				<ResetPasswordForm />
				<span className='text-center text-body-md'>
					Don&apos;t have an account? <Link href={'/login'}>Sign Up Now!</Link>
				</span>
			</div>
		</>
	)
}
