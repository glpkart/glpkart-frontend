/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${process.env.BACKEND_URL || 'http://junction.proxy.rlwy.net:27523'}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
