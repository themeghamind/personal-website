// app/personal-projects/page.tsx
import Link from 'next/link'
import { fetchProjectCards } from 'app/personal-projects/lib/github'
import { PageButtons } from 'app/components/pagebuttons'

export default async function PersonalProjectsPage() {
  const username = 'themeghamind'

  // Add the fork you want to force-show here:
  const repos = await fetchProjectCards(username, {
    limit: 3,
    includeForks: true, // allow forks generally
    pinned: [
      // Example: ensure this fork shows up
      'siddhantsharma301/aros',
      'Net-Impact-Berkeley/nib', // e.g. 'vercel/next.js'
      // You can also pin your own repos: 'themeghamind/some-repo'
    ],
    // sortBy: 'stars', // default
  })

  return (
    <section className="space-y-8">
      <h1 className="text-3xl [font-family:var(--font-instrument)] tracking-tight">Personal Projects</h1>

      {/* Contribution chart you already added earlier */}
    <h2 className="text-xl [font-family:var(--font-instrument)] mt-2"> Projects of my own as well as repositories I've contributed to over the years </h2>
      <div>
        <ul className="space-y-4">
          {repos.map((r) => (
            <li key={r.url} className="group">
              <Link
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl [font-family:var(--font-instrument)] text-neutral-900 dark:text-neutral-100 hover:text-[#0B99FF] transition-colors"
              >
                {r.name}
              </Link>

              {r.description && (
                <p className="[font-family:var(--font-instrument)] text-neutral-700 dark:text-neutral-300">
                  {r.description}
                </p>
              )}

              {r.languages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {r.languages.map((l) => (
                    <span
                      key={l.name}
                      className="text-xs rounded-full border border-stone-200 dark:border-stone-700 px-2 py-0.5 text-stone-700 dark:text-stone-200"
                    >
                      {l.name} {l.pct}%
                    </span>
                  ))}
                </div>
              )}

              {/* Optional: show if it’s a fork */}
              {/* <div className="text-xs text-stone-500">{r.fork ? 'Fork' : ''}</div> */}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
            <PageButtons pages={[
                {
                    href: '/',
                    name: 'back to homepage',
                    backIcon: true
                }
            ]}/>
        </div>
    </section>
  )
}
