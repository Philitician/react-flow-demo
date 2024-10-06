/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "ygmypmwwkcejtqle.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
