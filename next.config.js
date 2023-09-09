/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    styledComponents: true,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true
            }
        ]
    }
};

module.exports = nextConfig;
