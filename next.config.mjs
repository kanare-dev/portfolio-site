/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nlp.netlearning.co.jp",
      },
      {
        protocol: "https",
        hostname: "www.openbadge-global.com",
      },
    ],
  },
};

export default nextConfig;
