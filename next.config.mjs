/** @type {import('next').NextConfig} */
const nextConfig = {
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
