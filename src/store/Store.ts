// #region Global Imports
import { configureStore } from '@reduxjs/toolkit';

import Reducers from "./Reducers";

export const makeStore = (initialState: {}) => {
  return configureStore({
    reducer: Reducers
  })
};
