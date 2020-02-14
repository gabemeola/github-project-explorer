import { Repos, Repo } from 'models/repos';

export enum SortOptions {
  'popular' = 'popular',
  'updated' = 'updated',
  'issues' = 'issues',
  'stars' = 'stars',
}

/**
 * Super accurate popularity score generator
 */
function createPopularScore(repo: Repo) {
  return (
    // Stars are worth 2 points
    repo.stargazers_count * 2 +
    // Forks are worth 3 points (more collaboration)
    repo.forks_count * 3 +
    // Open issues are worth 1 point
    repo.open_issues_count
  );
}

export function sortByPopularity(repos: Repos) {
  return repos.sort((a, b) => {
    return createPopularScore(b) - createPopularScore(a);
  });
}

export function sortByLastUpdated(repos: Repos) {
  return repos.sort((a, b) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });
}

export function sortByIssues(repos: Repos) {
  return repos.sort((a, b) => {
    return b.open_issues_count - a.open_issues_count;
  });
}

export function sortByStars(repos: Repos) {
  return repos.sort((a, b) => {
    return b.stargazers_count - a.stargazers_count;
  });
}

export function sortWithOption(repos: Repos, option: SortOptions) {
  switch (option) {
    case SortOptions.popular:
      return sortByPopularity(repos);
    case SortOptions.stars:
      return sortByStars(repos);
    case SortOptions.issues:
      return sortByIssues(repos);
    case SortOptions.updated:
      return sortByLastUpdated(repos);
    default:
      return repos;
  }
}
