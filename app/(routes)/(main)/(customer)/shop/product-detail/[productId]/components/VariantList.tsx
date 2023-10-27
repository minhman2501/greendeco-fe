const Variant = () => {
	return (
		<div className='flex-col-start items-center justify-center gap-[4px] px-cozy py-[4px]'>
			<span
				className='aspect-square w-[40px] rounded-[100%]'
				style={{ backgroundColor: '#e6e8ea' }}
			></span>
			<p className='text-body-sm'>Stone</p>
		</div>
	)
}

export const VariantList = () => {
	return (
		<div className='flex gap-cozy'>
			<Variant />
			<div className='flex-col-start items-center justify-center gap-[4px] px-cozy py-[4px]'>
				<span className='aspect-square w-[40px] rounded-[100%] bg-primary-580 p-[4px]'></span>
				<p className='text-body-sm'>Stone</p>
			</div>
			<div className='flex-col-start items-center justify-center gap-[4px] px-cozy py-[4px]'>
				<span className='aspect-square w-[40px] rounded-[100%] bg-primary-580'></span>
				<p className='text-body-sm'>Stone</p>
			</div>
			<div className='flex-col-start items-center justify-center gap-[4px] px-cozy py-[4px]'>
				<span className='aspect-square w-[40px] rounded-[100%] bg-primary-580'></span>
				<p className='text-body-sm'>Stone</p>
			</div>
		</div>
	)
}
