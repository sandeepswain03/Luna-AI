import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/langflow/:langflowId/api/v1/run/:flowId",
        destination:
          "https://api.langflow.astra.datastax.com/lf/:langflowId/api/v1/run/:flowId",
      },
    ];
  },
};

export default nextConfig;
