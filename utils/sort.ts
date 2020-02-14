// TODO: This is a great file to add test coverage
// to as it contains some core business logic.
import { Repos, Repo } from 'models/repos';

export enum SortOptions {
  'popular' = 'popular',
  'updated' = 'updated',
  'issues' = 'issues',
  'stars' = 'stars',
}

/**
 * Creates a Repo sorting function
 * using comparison function.
 *
 * @param compareFn - Function use to create a comparison number
 */
function createSort(compareFn: (repo: Repo) => number) {
  return (repos: Repos) => {
    return repos.sort((a, b) => {
      return compareFn(b) - compareFn(a);
    });
  };
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

export const sortByPopularity = createSort(createPopularScore);
export const sortByLastUpdated = createSort((repo) => new Date(repo.updated_at).getTime());
export const sortByIssues = createSort((repo) => repo.open_issues_count);
export const sortByStars = createSort((repo) => repo.stargazers_count);

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
