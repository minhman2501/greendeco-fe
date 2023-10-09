type CookieParams = {
	name: string
	value: string
	expireDay?: number
}
export function setCookie({ name, value }: CookieParams) {
	document.cookie = name + '=' + value + ';path=/'
}

export function getCookie(cookieName: string) {
	const value = '; ' + document.cookie
	const parts = value.split('; ' + cookieName + '=')
	if (parts.length === 2) return parts.pop().split(';').shift()
}
