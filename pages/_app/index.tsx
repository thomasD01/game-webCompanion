import React from 'react';
import App, { AppInitialProps, AppContext } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { SessionProvider } from 'next-auth/react';

import { AppWithProps } from 'src/types';
import { makeStore } from 'src/store';
import Head from 'next/head';

class WebApp extends App<AppWithProps>{
  static async getInitialProps({
    Component,
    ctx,
    }: AppContext): Promise<AppInitialProps> {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        return { pageProps };
    }

  render(){
    const { Component, pageProps, store, session } = this.props;

    return(
      <>
        <Head >
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Web site created using create-react-app"
          />
          <title>Web Companion</title>
        </Head>
        <ReduxProvider store={store}>
          <SessionProvider session={session}>
            <Component {...pageProps}/>
          </SessionProvider>
        </ReduxProvider>
      </>
    )
  }
}

export default withRedux(makeStore)(WebApp);
