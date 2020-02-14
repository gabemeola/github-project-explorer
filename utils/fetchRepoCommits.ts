import { Commits } from 'models/commits';
import fetchGithub from './fetchGithub';

export default function fetchRepoCommits(owner: string, repo: string) {
  const url = `repos/${owner}/${repo}/commits`;
  return fetchGithub<Commits>(url);
}
