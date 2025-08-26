import { NextResponse } from 'next/server';

export const revalidate = 60 * 60 * 12; // cache 12h

export async function GET() {
  const username = 'themeghamind';

  const now = new Date();
  const from = new Date(now.getFullYear(), 0, 1) // Jan 1 this year
    .toISOString()
    .slice(0, 10);
  const to = new Date().toISOString().slice(0, 10);

  const url = `https://github.com/users/${username}/contributions?from=${from}&to=${to}`;

  // Fetch the HTML fragment that contains an <svg> contribution graph
  const res = await fetch(url, {
    headers: { 'User-Agent': 'personal-site' },
    // cache on the server
    next: { revalidate },
  });

  const html = await res.text();
  // Extract just the <svg> … </svg> so we can return SVG directly
  const match = html.match(/<svg[\s\S]*?<\/svg>/i);
  const svg = match?.[0] ?? '<svg xmlns="http://www.w3.org/2000/svg"></svg>';

  return new NextResponse(svg, {
    status: 200,
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
}
