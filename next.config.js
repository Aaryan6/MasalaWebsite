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
    NEXT_PUBLIC_HOST_NAME: "https://madhavmasaala.vercel.app/",
    NEXT_PUBLIC_JWT_TOKEN_KEY: "MADHAVJWTTOKENKEY12",
    NEXT_PUBLIC_PASSWORD_CRYPTO_KEY: "GUPTCODE123",
    NEXT_PUBLIC_PRICE_ID_500GM: "price_1LsVTySB522dzmKxAdfmUcXh",
    NEXT_PUBLIC_PRICE_ID_1KG: "price_1Lt3AISB522dzmKxkXmKv13U",
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      "pk_live_51JiX3eSB522dzmKxSBT5Cbqm9NL4DDSFoky2HoooLpArYi4Ps7p6qcD8WeI2Ojq242C8H8ev9dFtIXMp6r4G5L5900V8WmufBN",
    STRIPE_SECRET_KEY:
      "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",
    STRIPE_WEBHOOK_SECRET: "whsec_LzQCQu5r15yuFlsRElYdh51u8cSKk6bP",
  },
};

module.exports = nextConfig;
