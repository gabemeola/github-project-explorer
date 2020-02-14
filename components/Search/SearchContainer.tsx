import React, { useEffect, useState, useMemo, FormEvent, ChangeEvent, Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import fetchOrgRepos from 'utils/fetchOrgRepos';
import { Repos } from 'models/repos';
import ReposList from 'components/ReposList/ReposList';
import Sort from 'components/Sort/Sort';
import { SortOptions, sortWithOption } from 'utils/sort';
import * as styles from './styles';

type Props = {
  org?: string;
};

export default function Search({ org = '' }: Props) {
  const router = useRouter();
  // TODO: Better to use a state machine like xstate
  // or a reducer, since these states are correlated.
  const [repos, setRepos] = useState<Repos | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<SortOptions>(SortOptions.popular);
  const [searchOrg, setSearchOrg] = useState(org);

  useEffect(() => {
    if (!org) return;

    setHasError(false);
    const responsePromise = fetchOrgRepos(org);
    responsePromise
      .then(({ data }) => {
        setRepos(data);
      })
      .catch(() => {
        setHasError(true);
      });
    return () => {
      responsePromise.abort();
    };
  }, [org, setRepos]);

  const onSortChange = (option: SortOptions) => {
    setSortOption(option);
  };

  const handleSearchSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    router.push(`/search/${searchOrg}`);
  };

  const handleSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchOrg(ev.target.value);
  };

  const sortedRepos = useMemo(() => {
    if (repos === null) return [];
    return sortWithOption(repos, sortOption);
  }, [repos, sortOption]);

  return (
    <Fragment>
      <Head>
        <title>Github Project Explorer - {org}</title>
      </Head>

      <h2>Github Project Explorer</h2>
      <br />
      <form onSubmit={handleSearchSubmit}>
        <label htmlFor="input">
          Search for a Github organization
          <input
            id="input"
            type="text"
            className={styles.input}
            value={searchOrg}
            onChange={handleSearchChange}
            placeholder="Netflix"
          />
        </label>
      </form>
      {hasError && <h3 className={styles.error}>Unable to find repos for &quot;{org}&quot;</h3>}

      {org && hasError === false && (
        <Fragment>
          <Sort onChange={onSortChange} />
          <br />
          <h3>
            Search for {org}.
            {repos
              ? repos.length > 100
                ? ` Last ${repos.length} projects created found`
                : ` Found ${repos.length} projects`
              : null}
          </h3>
          <br />
          {repos !== null ? <ReposList repos={sortedRepos} /> : 'Loading...'}
        </Fragment>
      )}
    </Fragment>
  );
}
