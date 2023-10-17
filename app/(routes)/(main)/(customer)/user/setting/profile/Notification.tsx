import React from 'react'
import { toast } from 'react-toastify'

export const notifySuccess = () => {
	toast.success(<UpdateSuccessMessage />, {
		position: 'top-center',
	})
}
export const notifyError = (errorMessage?: string) => {
	toast.error(<UpdateErrorMessage message={errorMessage ? errorMessage : undefined} />, {
		position: 'top-center',
	})
}

const UpdateSuccessMessage = () => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-primary-625'>Updated Successfully!</h3>
	</div>
)

const UpdateErrorMessage = ({ message }: { message?: string }) => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-status-error'>
			{message ? message : 'Failed to update your profile'}
		</h3>
	</div>
)
