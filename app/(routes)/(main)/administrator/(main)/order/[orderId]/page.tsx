export default function OrderDetailManagementPage({
	params,
}: {
	params: {
		orderId: string
	}
}) {
	const { orderId } = params

	return <h1>{orderId}</h1>
}
