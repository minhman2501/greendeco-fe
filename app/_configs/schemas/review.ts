import { MIN_PASSWORD, MAX_PASSWORD } from '../constants/variables'
import * as z from 'zod'

export const ReviewSchema = z.object({
	review: z
		.string()
		.min(20, 'Your comment needs to have more than 20 characters')
		.max(100, 'No more than 100 characters')
		.email('Email is invalid'),
	star: z.number().min(0).max(5, 'You can only rate up to 5 star only'),
})

export type ReviewInputType = z.infer<typeof ReviewSchema>
