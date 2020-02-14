import 'utils/nodePolyfills';
import { NextApiRequest, NextApiResponse } from 'next';
import fetchGithub from 'utils/fetchGithub';
import parseGithubLink from 'utils/parseGithubLink';
import { Repos } from 'models/repos';

/**
 * Recursively fetches an organization's repos
 * up to until reaching 100.
 *
 * @param url - Url of Github API to fetch
 * @param [collectedRepos] - Repos collected so far. Defaults to an empty array.
 */
async function collectGithubRepos(url: string, collectedRepos: Repos = []): Promise<Repos> {
  const fetchRes = await fetchGithub<Repos>(url);
  collectedRepos.push(...fetchRes.data);

  // Parse "next" rel links
  const relLinks = fetchRes.headers.get('link');
  if (relLinks != null) {
    const parsedLinks = parseGithubLink(relLinks);
    // Stop collecting repos after 100
    if (parsedLinks.next && collectedRepos.length < 100) {
      return collectGithubRepos(parsedLinks.next, collectedRepos);
    }
  }

  return collectedRepos;
}

// Bypass rate limiting in development
const repoCache = new Map<string, Repos>();

export default async function getOrgRepos(req: NextApiRequest, res: NextApiResponse) {
  const org = req.query.org as string;

  // Set rudimentary cache headers
  res.setHeader('ETag', `W/"${btoa(org)}"`);
  res.setHeader('Cache-Control', 'private, max-age=60, s-maxage=60');
  // Check if populated in cache
  if (repoCache.has(org)) {
    return res.send(repoCache.get(org));
  }

  try {
    const repos = await collectGithubRepos(`orgs/${org}/repos?sort=update`);
    repoCache.set(org, repos);
    res.send(repos);
  } catch (err) {
    console.error(err);
    res.status(err.status).send(err.statusText);
  }
}
