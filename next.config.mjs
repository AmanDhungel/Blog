/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
        {
            // matching all API routes
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }
    ]
},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },

    webpack: (config) => {
        config.module.rules.push({
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/media/',
              outputPath: 'static/media/',
              name: '[name].[hash].[ext]',
            },
          },
        });
    
        return config;
      },
};

export default nextConfig;
