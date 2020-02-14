import React, { useState } from 'react';
import { SortOptions } from 'utils/sort';
import * as styles from './styles';

type Props = {
  onChange: (type: SortOptions) => any;
};

export default function Sort({ onChange }: Props) {
  const [selected, setSelected] = useState<SortOptions>(SortOptions.popular);

  const handleClick = (option: SortOptions) => () => {
    setSelected(option);
    onChange(option);
  };

  return (
    <div className={styles.wrapper}>
      <button
        onClick={handleClick(SortOptions.popular)}
        type="button"
        data-active={selected === SortOptions.popular}
        title="Sort by most popular"
      >
        Popular
      </button>
      <button
        onClick={handleClick(SortOptions.stars)}
        type="button"
        data-active={selected === SortOptions.stars}
        title="Sort by most stars"
      >
        Stars
      </button>
      <button
        onClick={handleClick(SortOptions.issues)}
        type="button"
        data-active={selected === SortOptions.issues}
        title="Sort by most issues"
      >
        Issues
      </button>
      <button
        onClick={handleClick(SortOptions.updated)}
        type="button"
        data-active={selected === SortOptions.updated}
        title="Sort by most recently updated"
      >
        Updated
      </button>
    </div>
  );
}
