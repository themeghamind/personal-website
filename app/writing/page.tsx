import { BlogPosts } from 'app/components/posts'
import { PageButtons } from 'app/components/pagebuttons'

export const metadata = {
  title: 'Writing',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <section>
      <h1 className="text-3xl mb-8 [font-family:var(--font-instrument)]">Writing</h1>
      <BlogPosts />
      <div className="mt-12">
        <PageButtons pages={[
          {
            href: '/',
            name: 'back to homepage',
            backIcon: true
          },
        ]}/>
      </div>
    </section>
  )
}
