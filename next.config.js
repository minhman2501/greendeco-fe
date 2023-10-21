/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'dist',
	images: {
		unoptimized: true,
	},
	async redirects() {
		return [
			{
				source: '/shop',
				destination: '/shop/product-list',
				permanent: true,
			},
		]
	},
}

module.exports = nextConfig
