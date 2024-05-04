/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  images: {
    // domains: ['files.edgestore.dev'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
