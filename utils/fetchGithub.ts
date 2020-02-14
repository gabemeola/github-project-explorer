import betterFetch from './betterFetch';

const githubUrl = 'https://api.github.com';

export default function fetchGithub<T = any>(path: string) {
  const url = new URL(path, githubUrl);
  return betterFetch<T>(url.href, {
    headers: {
      // Use v3 of Github's API
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Basic ${btoa(`gabemeola:28cd190abfe73d8e95703156f029707b24b64372`)}`,
    },
  });
}
