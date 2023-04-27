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
        {/* Add Google Font Montserrat */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"/>
      </Head>
      {/* Add the favicon */}
      {/* Note that the path doesn't include "public" */}

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;