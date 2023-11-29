export const MIN_PASSWORD = 8
export const MAX_PASSWORD = 50

export const IMAGE_MAX_SIZE_IN_MB = 5

export const REQUIRED_FIELD_STRING = 'This field is required'

export const EMPTY_STRING = 'empty'

export const VARIANT_CURRENCY = 'USD'

export const SIZE_OPTIONS = ['S', 'M', 'L', 'XL']
export const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard']
export const TYPE_OPTIONS = ['Outdoor', 'Indoor']

export const ADMINISTRATOR_ROUTE = {
	PRODUCT: {
		LINK: '/administrator/product',
		LABEL: 'Product Management',
	},
	ORDER: {
		LINK: '/administrator/order',
		LABEL: 'Order Management',
	},
}

export const USER_SETTING_ROUTE = {
	ORDER: {
		LINK: '/user/order',
		LABEL: 'Product Management',
	},
	SETTING: {
		PROFILE: {
			LINK: '/user/setting/profile',
			LABEL: 'User Profile Setting',
		},
		PASSWORD: {
			LINK: '/user/setting/changepassword',
			LABEL: 'User Password Setting',
		},
	},
}
