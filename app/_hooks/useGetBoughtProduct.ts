import { AxiosError } from 'axios'
import {
	getOrderDetailById,
	getOrderListByUser,
	getOrderProductListById,
} from '../_api/axios/order'
import { FilterParams, getProductBaseById, getProductDetailById } from '../_api/axios/product'
import { BAD_REQUEST_STATUS } from '../_configs/constants/status'

const testDataString = [
	'61284b33-2d63-4459-8203-bd56eba4c5e9',
	'1',
	'2e7689e3-0765-42cc-bb33-94d0bb4f35a3',
	'2',
]

export const useGetBoughtProducts = () => {
	const completedOrderParams: FilterParams = {
		limit: 9999,
		field: JSON.stringify({
			state: 'completed',
		}),
	}

	const handleGetBoughtProduct = async () => {
		return await getOrderListByUser(completedOrderParams)
			.then(async (data) => {
				const testFull = data.items.map(async (order) => {
					const orderWithProductId = await getOrderProductListById(order.id)
					return orderWithProductId
				})

				return await Promise.all(testFull)
			})
			.then((data) => {
				const orderWithProductIdList = data.map((order) => {
					return order.items.map((item) => {
						return item.product_id
					})
				})
				return orderWithProductIdList.join().split(',')
			})
			.then((data) => {
				return data.filter((item, index) => data.indexOf(item) === index)
			})
			.then((data) => {
				return Promise.all(
					data.map(async (item) => {
						return await getProductBaseById(item)
							.catch((e) => {
								if (
									e instanceof AxiosError &&
									e.response?.status === BAD_REQUEST_STATUS
								) {
									return undefined
								}
							})
							.then((data) => {
								if (data) return data.items
								else return
							})
					}),
				)
			})
			.then((data) => {
				return data.filter((item) => item)
			})
	}

	return {
		getBoughtProduct: handleGetBoughtProduct,
	}
}
