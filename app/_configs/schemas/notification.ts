import * as z from 'zod'

export const CreateNotificationSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	message: z.string().min(1, 'Message is required'),
})

export type CreateNotificationInputType = z.infer<typeof CreateNotificationSchema>
