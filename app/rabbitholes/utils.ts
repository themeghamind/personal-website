import fs from 'fs';
import path from 'path';

export type Rabbithole = {
  slug: string;
  metadata: { title: string; author: string };
  excerpt: string;
};

const DIR = path.join(process.cwd(), 'app', 'rabbitholes', 'notes');

function parseFrontmatter(src: string) {
  const m = /---\s*([\s\S]*?)\s*---/.exec(src);
  let meta: Record<string, string> = {};
  let body = src;
  if (m) {
    body = src.replace(m[0], '').trim();
    m[1].split('\n').forEach(line => {
      const [k, ...rest] = line.split(': ');
      meta[k.trim()] = rest.join(': ').replace(/^['"](.*)['"]$/, '$1').trim();
    });
  }
  return { meta, body };
}

function stripHtml(s: string) {
  return s.replace(/<[^>]*>/g, '');
}

function toExcerpt(text: string, words = 24) {
  const plain = stripHtml(text).trim();
  if (!plain) return '';
  const out = plain.split(/\s+/).slice(0, words).join(' ');
  return out + (plain.split(/\s+/).length > words ? '…' : '');
}

export function getRabbitholes(): Rabbithole[] {
  const files = fs.readdirSync(DIR).filter(f => f.endsWith('.mdx'));
  const items = files.map(file => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug,
      metadata: {
        title: meta.title ?? slug,
        author: meta.author ?? '',
      },
      excerpt: toExcerpt(body),
    };
  });
  // sort newest by filename or keep as-is; tweak if you add dates
  return items.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title));
}
