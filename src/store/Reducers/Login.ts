import { createSlice } from '@reduxjs/toolkit'

type LoginState = {
  loggedIn: boolean;
}

const initialState: LoginState = {
  loggedIn: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { logIn, logOut } = loginSlice.actions;

export default loginSlice.reducer;
