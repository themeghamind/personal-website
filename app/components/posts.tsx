import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/writing/utils'

export async function BlogPosts() {
  const allBlogs = await getBlogPosts()

  return (
    <div>
      {allBlogs.map((post) => {
        const isExternal = post.slug.startsWith('http')
        const href = isExternal ? post.slug : `/blog/${post.slug}`

        return (
          <Link
            key={post.slug}
            className="group flex flex-col space-y-1 mb-4"
            href={href}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 shrink-0 flex-none group-hover:text-[#0B99FF] dark:text-neutral-400 w-[100px] text-xl tabular-nums tracking-tight [font-family:var(--font-instrument)]">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
            <p className="flex-1 min-w-0 text-neutral-900 group-hover:text-[#0B99FF] dark:text-neutral-100 text-xl [font-family:var(--font-instrument)]">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
