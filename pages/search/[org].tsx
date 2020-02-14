import React from 'react';
import { useRouter } from 'next/router';
import Search from 'components/Search/SearchContainer';

export default function SearchList() {
  const router = useRouter();
  const org = router.query.org as string | undefined;
  if (org == null) return null;

  return (
    <main>
      <Search org={org} />
    </main>
  );
}
