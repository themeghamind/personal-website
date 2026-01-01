import { XMLParser } from 'fast-xml-parser';

export type Post = {
  slug: string; // external URL
  metadata: {
    title: string;
    publishedAt: string; // ISO
    summary: string;
  };
};

const FEEDS = [
  'https://bartthoughts.substack.com/feed',
];

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: false,
  attributeNamePrefix: '',
});

function toArray<T>(x: T | T[] | undefined): T[] {
  if (!x) return [];
  return Array.isArray(x) ? x : [x];
}

function isComingSoon(title: unknown) {
  return String(title ?? '').trim().toLowerCase() === 'coming soon';
}

export async function fetchSubstackPosts(): Promise<Post[]> {
  const all: Post[] = [];

  await Promise.all(
    FEEDS.map(async (url) => {
      const res = await fetch(url, { next: { revalidate: 3600 } }); // cache 1h
      if (!res.ok) return;
      const xml = await res.text();
      const data = parser.parse(xml);
      const items = toArray<any>(data?.rss?.channel?.item);

      items.forEach((it) => {
        const link = it?.link ?? '';
        if (!link) return;
        all.push({
          slug: link,
          metadata: {
            title: it?.title ?? '',
            publishedAt: new Date(it?.pubDate ?? Date.now()).toISOString(),
            // Substack often has full HTML in content:encoded; fall back to description
            summary: it?.['content:encoded'] ?? it?.description ?? '',
          },
        });
      });
    })
  );

  // de-dupe and sort newest → oldest
  return Array.from(new Map(all.map((p) => [p.slug, p])).values())
  .filter(p => !isComingSoon(p.metadata.title))
  .sort((a, b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt));

}
