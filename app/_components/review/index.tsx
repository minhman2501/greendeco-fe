import ReviewDialog, { ReviewDialogProps } from './ReviewDialog'

export default function ReviewDialogContainer(props: ReviewDialogProps) {
	return (
		<div className='sticky flex h-full items-center justify-center'>
			<ReviewDialog {...props} />
		</div>
	)
}
