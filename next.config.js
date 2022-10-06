/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_URL:
      "mongodb+srv://aaryan:patel123@masaalacluster.cyinl5g.mongodb.net/?retryWrites=true&w=majority",
    HOST_NAME: "http://localhost:3000/",
  },
};

module.exports = nextConfig;
