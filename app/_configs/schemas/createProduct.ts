import * as z from 'zod'
import { REQUIRED_FIELD_STRING } from '../constants/variables'

export const CreateProductSchema = z.object({
	name: z.string().min(1, REQUIRED_FIELD_STRING).max(32, 'Name must be less than 32 characters'),
	description: z
		.string()
		.min(20, 'The detail of the product must contain at least 20 characters')
		.max(50, 'Detail must be less than 50 characters'),
	detail: z
		.string()
		.min(20, 'The detail of the product must contain at least 20 characters')
		.max(200, 'Detail must be less than 200 characters'),
	type: z.string().min(1, REQUIRED_FIELD_STRING),
	size: z.string().min(1, REQUIRED_FIELD_STRING),
	water: z.string().min(1, REQUIRED_FIELD_STRING),
	difficulty: z.string().min(1, REQUIRED_FIELD_STRING),
	light: z.string().min(1, REQUIRED_FIELD_STRING),
})

export type CreateProductFormInputType = z.infer<typeof CreateProductSchema>
