/** @type {import('next').NextConfig} */
const nextConfig = {
    // Fix the lockfile warning
    outputFileTracingRoot: __dirname,

    // Ensure proper routing
    trailingSlash: false,

    // Optimize for production
    experimental: {
        optimizePackageImports: ['geist'],
    },
}

module.exports = nextConfig