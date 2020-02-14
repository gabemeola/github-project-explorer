/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Repos } from 'models/repos';
import * as styles from './styles';

type Props = {
  repos: Repos;
};

export default function ReposList({ repos }: Props) {
  return (
    <React.Fragment>
      {repos.map((repo) => {
        return (
          <div key={repo.id} className={styles.repo}>
            <Link href={`/search/${repo.owner.login}/${repo.name}`}>
              <a>
                <div>{repo.name}</div>
                <div className={styles.info}>
                  <span>{repo.stargazers_count} - Stars</span>
                  <span>{repo.forks_count} - Forks</span>
                  <span>{repo.open_issues_count} - Issues</span>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </React.Fragment>
  );
}
