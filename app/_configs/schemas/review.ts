import { MIN_PASSWORD, MAX_PASSWORD } from '../constants/variables'
import * as z from 'zod'

export const ReviewSchema = z.object({
	review: z
		.string()
		.min(20, 'Your comment needs to have more than 20 characters')
		.max(100, 'No more than 100 characters'),
	star: z.string(),
})

export type ReviewFormInputType = z.infer<typeof ReviewSchema>
