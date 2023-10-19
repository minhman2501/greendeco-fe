/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
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
