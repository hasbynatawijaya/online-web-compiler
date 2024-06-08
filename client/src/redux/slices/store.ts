import { configureStore } from "@reduxjs/toolkit";
import compilerSlice from "@/redux/slices/compilerSlice";
import { api } from "./api";
import appSlice from "./appSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    compilerSlice: compilerSlice,
    appSlice: appSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
