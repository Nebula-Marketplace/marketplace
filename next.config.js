/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverActions: true
    },
    styledComponents: true,
    images: {
        domains: ['pbs.twimg.com', "i.imgur.com", "ipfs.io"]
    }
};

module.exports = nextConfig;
