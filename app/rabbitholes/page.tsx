import Link from 'next/link';
import { getRabbitholes } from './utils';
import { PageButtons } from 'app/components/pagebuttons'

export default function Page() {
  const items = getRabbitholes(); // server-side fs read

  return (
    <section>
      <h1 className="text-3xl mb-8 [font-family:var(--font-instrument)]">Rabbitholes</h1>

      <p className="[font-family:var(--font-instrument)] text-xl mb-6">
        I like falling down rabbitholes. Here are notes on recent papers and
        books I&apos;ve read (you can also find me on{' '}
        <a
          href="https://curius.app/megha-jain"
          className="text-[#0B99FF] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          curius.app
        </a>
        {'):'}
      </p>

      <ul className="space-y-4">
        {items.map(({ slug, metadata, excerpt }) => (
          <li key={slug} className="flex flex-col gap-1">
            <div className="text-lg font-medium [font-family:var(--font-instrument)]">
              {metadata.title}
            </div>
            <div className="text-sm text-neutral-600 [font-family:var(--font-instrument)]">
              {metadata.author}
            </div>
            {/* Only the description is a link */}
            <Link
              href={`/rabbitholes/${slug}`}
              className="text-neutral-800 hover:text-[#0B99FF] transition-colors [font-family:var(--font-instrument)]"
            >
              {excerpt || 'Read notes →'}
            </Link>
          </li>
        ))}
      </ul>
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
  );
}
