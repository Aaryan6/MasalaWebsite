/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://madhavmasaala.vercel.app/api/:path*",
      },
    ];
  },

  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_URL:
      "mongodb+srv://aaryan:patel123@masaalacluster.cyinl5g.mongodb.net/?retryWrites=true&w=majority",
    NEXT_PUBLIC_HOST_NAME: "http://localhost:3000",
    NEXT_PUBLIC_JWT_TOKEN_KEY: "MADHAVJWTTOKENKEY12",
    NEXT_PUBLIC_PASSWORD_CRYPTO_KEY: "GUPTCODE123",
    NEXT_PUBLIC_PRICE_ID_500GM: "price_1LsVTySB522dzmKxAdfmUcXh",
    NEXT_PUBLIC_PRICE_ID_1KG: "price_1Lt3AISB522dzmKxkXmKv13U",
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      "pk_test_51JiX3eSB522dzmKxO8F2PpWoFA1V89feLwhwn6iYbWxjMKAHthSx7euW099INb7068wJKOcvtZhN9Ttsy5dO5J5B00RTZ0gMTN",
    STRIPE_SECRET_KEY:
      "sk_test_51JiX3eSB522dzmKxgNC8HbE7kWB6XZzbU49Lj67B3LQlgqSxD7iOY93q4ZBtMZMF04kvRN9YoqUi3fQYd7g3dqPP00rTiuSMGK",
  },
};

module.exports = nextConfig;
