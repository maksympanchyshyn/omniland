/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'l3img.b-cdn.net',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'movricons.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      { protocol: 'https', hostname: 'static.debank.com', port: '', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;
