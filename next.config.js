/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        COINAPI_KEY: process.env.COINAPI_KEY
    }
}

module.exports = nextConfig
