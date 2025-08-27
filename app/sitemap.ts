import { getBlogPosts } from 'app/writing/utils'

export const baseUrl = 'https://www.meghajain.me/'

export default async function sitemap() {
  let posts = await getBlogPosts();
  let blogs = posts.map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/writing'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
