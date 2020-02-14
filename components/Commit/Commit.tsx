import React from 'react';
import { Commit as CommitType } from 'models/commits';
import * as styles from './styles';

type Props = {
  commit: CommitType;
};

function parseCommitMessage(message: string): [string, Array<string> | null] {
  const split = message.split('\n').filter((m) => m !== '');
  const commitTitle = split[0];
  const commitBody = split[1] ? split.slice(1) : null;

  return [commitTitle, commitBody];
}

export default function Commit({ commit }: Props) {
  const [commitTitle, commitBody] = parseCommitMessage(commit.commit.message);
  const date = new Date(commit.commit.committer.date).toLocaleString();

  return (
    <div className={styles.wrapper}>
      <div className={styles.dot} />
      <div className={styles.commit}>
        <a href={commit.html_url} target={commit.sha}>
          <div className={styles.commitTitle}>{commitTitle}</div>
        </a>
        {commitBody && (
          <div className={styles.commitBody}>
            {commitBody.map((m, index) => (
              <div key={m + index}>{m}</div>
            ))}
          </div>
        )}
        <div className={styles.info}>
          <span title={date}>{date}</span>
        </div>
      </div>
    </div>
  );
}
