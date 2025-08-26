import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
// If you have a blog MDX renderer component, import it here.
// import { MDXContent } from 'app/components/mdx'; // example

const DIR = path.join(process.cwd(), 'app', 'rabbitholes', 'notes');

export default async function RabbitholePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return notFound();
  // If your app is already configured to use MDX in the app router,
  // you can also consider moving notes to `app/rabbitholes/[slug]/page.mdx` instead.
  const raw = fs.readFileSync(file, 'utf8');

  // TODO: render MDX. If you have a helper from your blog, use it.
  // For now, just show a placeholder to prove navigation works:
  return (
    <section>
      <pre className="whitespace-pre-wrap">{raw}</pre>
    </section>
  );
}
