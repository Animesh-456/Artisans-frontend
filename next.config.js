/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/pricing_guide',
        destination: '/account/price'
      },

      {
        source: '/machining',
        destination: '/job/post'
      },
      {
        source: '/page/works',
        destination: '/account/how_it_works'
      },

      {
        source: '/machining/listing',
        destination: '/job/listing'
      },

      {
        source: '/page/who_we_are',
        destination: '/account/who_we_are'
      },
    ]
  },
}

module.exports = nextConfig
