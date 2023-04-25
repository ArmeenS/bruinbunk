import React from 'react'
import { AppProps } from 'next/app'
import Head from "next/head";

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Add the favicon */}
      <Head>
        <title>BruinBunk</title>
        <link rel="shortcut icon" href="/B.ico" />
      </Head>
      {/* Add the favicon */}
      {/* Note that the path doesn't include "public" */}

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;