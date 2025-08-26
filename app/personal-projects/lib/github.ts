// app/lib/github.ts
type Repo = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  fork: boolean;
  owner: { login: string };
};

export type RepoCard = {
  name: string;
  url: string;
  description: string;
  languages: { name: string; pct: number }[];
  fork?: boolean;
};

const GITHUB = 'https://api.github.com';
const headers: Record<string, string> = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'personal-site',
  // If you add a token for higher rate limits:
  // ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function toCard(repo: Repo): Promise<RepoCard> {
  const langRes = await fetch(`${GITHUB}/repos/${repo.owner.login}/${repo.name}/languages`, {
    headers,
    next: { revalidate: 60 * 60 * 12 },
  });
  const bytes: Record<string, number> = await langRes.json();
  const total = Object.values(bytes).reduce((a, b) => a + b, 0) || 1;

  const languages = Object.entries(bytes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, v]) => ({ name, pct: Math.round((v / total) * 100) }));

  return {
    name: repo.name,
    url: repo.html_url,
    description: repo.description ?? '',
    languages,
    fork: repo.fork,
  };
}

async function fetchRepoByFullName(full: string): Promise<Repo | null> {
  const [owner, name] = full.split('/');
  if (!owner || !name) return null;
  const res = await fetch(`${GITHUB}/repos/${owner}/${name}`, {
    headers,
    next: { revalidate: 60 * 60 * 12 },
  });
  if (!res.ok) return null;
  return (await res.json()) as Repo;
}

export async function fetchProjectCards(
  username: string,
  opts?: {
    limit?: number;
    includeForks?: boolean;
    pinned?: string[]; // e.g. ['upstream/some-forked-repo', 'themeghamind/this-one']
    sortBy?: 'stars' | 'updated';
  }
): Promise<RepoCard[]> {
  const limit = opts?.limit ?? 3;
  const includeForks = opts?.includeForks ?? false;
  const sortBy = opts?.sortBy ?? 'stars';
  const pinned = opts?.pinned ?? [];

  // 1) Pinned first (can be forks, any owner)
  const pinnedRepos = (
    await Promise.all(pinned.map((full) => fetchRepoByFullName(full)))
  ).filter(Boolean) as Repo[];

  // 2) Fetch user’s repos
  const reposRes = await fetch(
    `${GITHUB}/users/${username}/repos?per_page=100&type=owner&sort=updated`,
    { headers, next: { revalidate: 60 * 60 * 12 } }
  );
  const allRepos: Repo[] = await reposRes.json();

  // 3) Filter (forks optional) and remove those already pinned
  const pinnedSet = new Set(pinnedRepos.map((r) => r.full_name));
  const pool = allRepos
    .filter((r) => (includeForks ? true : !r.fork))
    .filter((r) => !pinnedSet.has(r.full_name));

  // 4) Sort pool
  pool.sort((a, b) =>
    sortBy === 'updated'
      ? 0 // GitHub already sorts by updated desc
      : b.stargazers_count - a.stargazers_count
  );

  // 5) Take remaining to fill limit
  const selected = [...pinnedRepos, ...pool].slice(0, limit);

  // 6) Build cards with languages
  return Promise.all(selected.map((r) => toCard(r)));
}
