/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/public',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
