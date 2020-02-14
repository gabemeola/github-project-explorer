import { Repos } from 'models/repos';
import betterFetch from './betterFetch';

/**
 * Fetches an org's repos
 *
 * @param org - Which org repos to fetch
 */
export default function fetchOrgRepos(org: string) {
  const url = `/api/repos/${org}?sort=popular`;
  return betterFetch<Repos>(url);
}
