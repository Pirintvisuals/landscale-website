/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/services/ai-lead-generation",
        destination: "/services/ai-estimator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
