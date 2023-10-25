import CommentSection from './ProductCommentSection'
import DetailContainer from './ProductDetailContainer'
import ImageGallery from './ProductImageGallery'
import Price from './ProductPrice'

export default function ProductDetailPage({
	params,
}: {
	params: {
		productId: string
	}
}) {
	return (
		<div className='flex-col-start gap-comfortable'>
			<ImageGallery />
			<div className='grid grid-cols-2 gap-comfortable'>
				<DetailContainer />
				<div className='flex-col-start gap-cozy'>
					<Price />
					<CommentSection />
				</div>
			</div>
		</div>
	)
}
