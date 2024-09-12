/** @type {import('next').NextConfig} */
import webpack from "webpack";
import { codeInspectorPlugin } from "code-inspector-plugin";
const nextConfig = {
  webpack(config, { dev, isServer }) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    // 同时按住 [shift + ⌥option] 时启用 inspector 功能(点击页面元素可定位至编辑器源代码)
    // config.plugins.push(codeInspectorPlugin({ bundler: "webpack" }));

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
