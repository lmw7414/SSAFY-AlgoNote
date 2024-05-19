/** @type {import('next').NextConfig} */

const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ['algonote.s3.ap-northeast-2.amazonaws.com'],
  },
}

export default nextConfig
