import * as z from 'zod'

export const ShippingAddressSchema = z.object({
	city: z.string().min(1, 'First name is required'),
	district: z.string().min(1, 'Last name is required'),
	ward: z.string().min(1, 'Email is required'),
	address: z.string().min(1, 'Phone number is required'),
})

export type ShippingAddressFormInputType = z.infer<typeof ShippingAddressSchema>
