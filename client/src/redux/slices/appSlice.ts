import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IUser } from "@/types/userTypes";

export interface IAppSliceState {
  currentUser?: IUser;
  isLoggedIn: boolean;
}

const initialState: IAppSliceState = {
  currentUser: undefined,
  isLoggedIn: false,
};

const appSLice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser | undefined>) => {
      state.currentUser = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export default appSLice.reducer;
export const { setCurrentUser, setIsLoggedIn } = appSLice.actions;
