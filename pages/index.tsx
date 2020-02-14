import React from 'react';
import Head from 'next/head';
import Search from 'components/Search/SearchContainer';

export default function Home() {
  return (
    <main>
      <Head>
        <title>Github Project Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Search />
      <br />
      <h3>Try searching for a Github Organization such as &quot;Workfront&quot;</h3>
    </main>
  );
}
