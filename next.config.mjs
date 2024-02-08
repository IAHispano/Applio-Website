/** @type {import('next').NextConfig} */
import pwa from 'next-pwa'

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.discordapp.com", "imgs.search.brave.com", "i.imgur.com"],
  },
}

const withPWA = pwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

export default nextConfig
