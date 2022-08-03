/**
 * @type {import('next').NextConfig}
 */
const withImages = require("next-images")

module.exports = withImages({
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: ["quanly.exxe.vn", process.env.NEXT_PUBLIC_IMAGE_URL],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
})
