import { PageButtons } from "./components/pagebuttons";

export default function NotFound() {
  return (
    <section>
      <h1 className="mb-8 [font-family:var(--font-instrument)] text-3xl">
        404 - Page Not Found
      </h1>
      <p className="mb-4 [font-family:var(--font-instrument)] text-xl">The page you are looking for does not exist (for now). Content coming soon!</p>
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
