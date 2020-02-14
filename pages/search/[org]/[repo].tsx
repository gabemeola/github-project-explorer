import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import fetchRepoCommits from 'utils/fetchRepoCommits';
import { Commits } from 'models/commits';
import Commit from 'components/Commit/Commit';

export default function RepoDetails() {
  const router = useRouter();
  const org = router.query.org as string | undefined;
  const repo = router.query.repo as string | undefined;
  const [commits, setCommits] = useState<Commits>([]);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (org == null || repo == null) return;
    setHasError(false);
    const res = fetchRepoCommits(org, repo);
    res
      .then(({ data }) => {
        setCommits(data);
      })
      .catch(() => {
        setHasError(true);
      });

    return () => {
      res.abort();
    };
  }, [org, repo]);

  if (org == null || repo == null) return null;

  return (
    <main>
      <Head>
        <title>
          Github Project Explorer - {org} - {repo} commits
        </title>
      </Head>
      <h1>
        <Link href={`/search/${org}`}>{`⇠ ${org}`}</Link> - {repo} recent commits
      </h1>
      {hasError && (
        <h3 style={{ color: 'maroon ' }}>Unable to find commits for &quot;{repo}&quot;</h3>
      )}

      <div style={{ overflow: 'hidden' }}>
        {commits.map((commit) => {
          return <Commit key={commit.sha} commit={commit} />;
        })}
      </div>
    </main>
  );
}
