/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local paths like /images/bookmarks/* and avoid remote optimizer issues in local mode.
    unoptimized: process.env.NEXT_PUBLIC_USE_LOCAL_DATA === "true",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/product-logos/**/**",
      },
    ],
  },
}

module.exports = nextConfig
