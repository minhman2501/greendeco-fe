import Block from '@/app/_components/Block'
import CreateProductForm from './CreateProductForm'

export default function CreateProductPage() {
	return (
		<div className='min-h-screen py-comfortable'>
			<Block>
				<h1>Create a new product</h1>
				<CreateProductForm />
			</Block>
		</div>
	)
}
