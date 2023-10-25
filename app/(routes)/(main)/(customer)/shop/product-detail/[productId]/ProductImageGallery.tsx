import Image from 'next/image'

const imagesList = [
	'https://bloomscape.com/cdn-cgi/image/quality=75,fit=scale-down,height=580,width=696,metadata=copyright,format=webp/wp-content/uploads/2022/01/bloomscape_red-prayer-pant_sm_angle2-scaled.jpg?ver=660085',
	'https://bloomscape.com/cdn-cgi/image/quality=75,fit=scale-down,height=922,width=768,metadata=copyright,format=webp/wp-content/uploads/2021/06/bloomscape_red-prayer-plant_stone_0621-scaled-e1626184323634.jpg',
	'https://bloomscape.com/cdn-cgi/image/quality=75,fit=scale-down,height=580,width=696,metadata=copyright,format=webp/wp-content/uploads/2022/04/bloomscape_stool-sm_clay-scaled.jpg?ver=768047',
	'https://bloomscape.com/cdn-cgi/image/quality=75,fit=scale-down,height=580,width=696,metadata=copyright,format=webp/wp-content/uploads/2019/03/bloomscape_peopleplants_red-prayer-plant-845x1024.jpg?ver=43381',
]
export default function ImageGallery() {
	return (
		<div className='grid h-[460px] grid-cols-2 gap-comfortable'>
			<div className='flex items-center justify-center rounded-[4px] border-[2px] border-primary-580-20 bg-white shadow-38 '>
				<ActiveImage imageUrl={imagesList[0]} />
			</div>
			<div className='flex h-full items-center justify-center'>
				<div className='aspect-square h-[80%]'>
					<ImagesGrid />
				</div>
			</div>
		</div>
	)
}

function ActiveImage({ imageUrl }: { imageUrl: string }) {
	return (
		<div className='relative h-full w-full'>
			<Image
				fill
				src={imageUrl}
				alt='plants art'
				style={{ objectFit: 'contain' }}
			/>
		</div>
	)
}

function ImagesGrid() {
	return (
		<div className='grid grid-cols-2 gap-compact'>
			{imagesList.map((image) => (
				<span
					className='relative aspect-square h-full rounded-[4px] border-[2px] border-primary-5555-60'
					key={image}
				>
					<Image
						layout='fill'
						src={image}
						alt='plants art'
					/>
				</span>
			))}
		</div>
	)
}
