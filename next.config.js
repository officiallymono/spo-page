module.exports = {
  reactStrictMode: true,
  env: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  },
  swcMinify: true,
  images: {
    domains: ['i.scdn.co'],
  },
  webpack(config) {
    return config;
  }
};
