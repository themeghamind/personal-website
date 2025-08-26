import { fetchSubstackPosts } from '../writing/lib/substack';

export async function GET() {
  const posts = await fetchSubstackPosts();
  const itemsXml = posts
    .map(
      (p) => `
      <item>
        <title><![CDATA[${p.metadata.title}]]></title>
        <link>${p.slug}</link>
        <description><![CDATA[${p.metadata.summary}]]></description>
        <pubDate>${new Date(p.metadata.publishedAt).toUTCString()}</pubDate>
      </item>`
    )
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0"><channel>
    <title>Megha’s Substack (merged)</title>
    <link>https://your-site</link>
    <description>Unified feed</description>
    ${itemsXml}
  </channel></rss>`;

  return new Response(rssFeed, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
