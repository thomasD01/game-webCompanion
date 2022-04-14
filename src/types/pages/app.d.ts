import { Store } from 'redux';
import { AppInitialProps } from 'next/app';
import { NextPageContext } from 'next';
import { ThunkDispatch } from 'redux-thunk';
import { Session } from 'next-auth';

interface AppStore extends Store {
  dispatch: ThunkDispatch;
}

export interface AppWithProps extends AppInitialProps {
  session: Session;
  store: AppStore;
}

export interface ReduxNextPageContext extends NextPageContext {
  store: AppStore;
}
