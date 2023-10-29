import Button from '@/app/_components/Button'
import { Input } from '@/app/_components/form'
export default function CommentForm() {
	return (
		<>
			<form className='flex w-full flex-col gap-cozy text-body-sm'>
				<div>
					<Input
						placeholder='Leave the comment'
						multiline
						error={false}
					/>
				</div>
				<Button>Send</Button>
			</form>
		</>
	)
}
