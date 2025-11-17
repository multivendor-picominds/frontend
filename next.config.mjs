import appConfig from "./src/appConfig/index.js";

/** @type {import('next').NextConfig} */
const { hostname, protocol } = new URL(`${appConfig.BASE_URL}`);

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: protocol.replace(":", ""),
        hostname: hostname,
      },
    ],
  },
};

export default nextConfig;
