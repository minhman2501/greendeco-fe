export default function ProductDetailManagementPage({
	params,
}: {
	params: {
		productId: string
	}
}) {
	return <h1>{params.productId}</h1>
}
