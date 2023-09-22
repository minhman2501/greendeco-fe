'use client'
import * as React from 'react'
import { Input as BaseInput, InputProps } from '@mui/base/Input'
import clsx from 'clsx'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import { useFormControlContext } from '@mui/base/FormControl'

//NOTE: Input
const Input = React.forwardRef(function Input(
	props: InputProps,
	ref: React.ForwardedRef<HTMLInputElement>,
) {
	const { className, ...otherInputProps } = props

	const formControlContext = useFormControlContext()
	if (formControlContext === undefined) {
		return null
	}
	const { disabled, error } = formControlContext

	return (
		<BaseInput
			{...otherInputProps}
			ref={ref}
			startAdornment={props.type && renderStartAndormentIcon(props.type)}
			slotProps={{
				root: {
					className: clsx(['baseInput', className], {
						inputDisabled: disabled,
						inputError: error,
					}),
				},
				input: {
					className: 'w-full outline-none bg-inherit',
				},
			}}
		/>
	)
})

//NOTE: Input renderStartAdornment

type StartIconType = {
	type: 'email' | 'password'
	icon: React.ReactNode
}

const StartIconArray: StartIconType[] = [
	{
		type: 'email',
		icon: <EnvelopeIcon className='aspect-square w-[1.8rem] text-primary-418-60' />,
	},
	{
		type: 'password',
		icon: <LockClosedIcon className='aspect-square w-[1.8rem] text-primary-418-60' />,
	},
]

const renderStartAndormentIcon = (type: React.HTMLInputTypeAttribute) => {
	const startIcon = StartIconArray.find((startIcon) => startIcon['type'] == type)
	if (startIcon) return startIcon.icon
}

export { Input }
