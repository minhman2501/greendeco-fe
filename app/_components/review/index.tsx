import ReviewDialog, { ReviewDialogProps } from './ReviewDialog'

export default function ReviewDialogContainer(props: ReviewDialogProps) {
	return (
		<div className='sticky left-[50%] top-[50%] z-50 w-fit translate-x-[-50%] translate-y-[-50%]'>
			<ReviewDialog {...props} />
		</div>
	)
}
