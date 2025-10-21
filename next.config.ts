/** @type {import('next').NextConfig} */
const nextConfig = {
};

const config = {
  ...nextConfig, 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'gvqinmfeguwszikifstd.supabase.co', 
      },
    ],
  },
};

module.exports = config;