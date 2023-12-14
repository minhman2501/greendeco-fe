import { StarIcon } from '@heroicons/react/24/solid'
import TopReviewSlider from './TopReviewSlider'
export default function CustomerReviews() {
	return (
		<section className='section-home bg-primary-580-20'>
			<div className='container'>
				<h2 className='text-center text-heading-1 capitalize text-primary-5555'>
					our customers thoughts about greenDeco plants
				</h2>
				<div>
					<TopReviewSlider />
				</div>
			</div>
		</section>
	)
}
