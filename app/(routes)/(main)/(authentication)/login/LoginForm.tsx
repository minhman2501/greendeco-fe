import TextField from '@/app/_components/form/TextField'
import Button from '@/app/_components/Button'
export default function LoginForm() {
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
				<div>
					<TextField
						type='password'
						label='Password'
						placeholder='Password'
					/>
				</div>
				<Button>Sign In</Button>
			</form>
		</>
	)
}
