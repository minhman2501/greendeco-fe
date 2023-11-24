import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
export function VariantDetailLoading() {
	return (
		<div className='grid grid-cols-3 gap-comfortable'>
			<SkeletonTheme
				baseColor='#e4e8e3'
				highlightColor='#f7f8f7'
				duration={2}
				borderRadius={4}
			>
				<Skeleton
					height={'auto'}
					className=' aspect-square'
				/>
				<Skeleton
					height={16}
					count={8}
					className='mb-compact'
				/>
			</SkeletonTheme>
		</div>
	)
}
