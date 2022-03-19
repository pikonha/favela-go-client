import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";
import getLibrary from "../getLibrary";
import Header from "../components/Header";

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Head>
        <title>Favela GO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
