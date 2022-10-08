/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://madhavmasaala.vercel.app/:path*",
      },
    ];
  },

  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_URL:
      "mongodb+srv://aaryan:patel123@masaalacluster.cyinl5g.mongodb.net/?retryWrites=true&w=majority",
    NEXT_PUBLIC_HOST_NAME: "https://madhavmasaala.vercel.app/",
  },
};

module.exports = nextConfig;
