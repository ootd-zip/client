/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/splash-screen',
        permanent: true,
      },
      {
        source: '/main',
        destination: '/main/explore',
        permanent: true,
      },
    ]
  }, 
  reactStrictMode: false, 
  images: {
    domains: ['img.freepik.com', 'www.google.es', 'image.msscdn.net', "", 'ootdzip.s3.ap-northeast-2.amazonaws.com']
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
