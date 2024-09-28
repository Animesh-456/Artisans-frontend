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
        source: '/artrequest',
        destination: '/job/post'
      },
      {
        source: '/how-it-works',
        destination: '/account/how_it_works'
      },

      {
        source: '/artworklisting',
        destination: '/job/listing'
      },

      {
        source: '/page/who_we_are',
        destination: '/account/who_we_are'
      },

      {
        source: '/:projectId',
        destination: '/machining/:projectId',
      },

      {
        source: '/inbox/:projectId/:fromId/:toId',
        destination: '/machining/msg/:projectId/:fromId/:toId',
      },
    ]
  },
}

module.exports = nextConfig
