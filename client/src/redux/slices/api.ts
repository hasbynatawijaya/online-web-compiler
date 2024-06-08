import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ICompilerInitialState } from "./compilerSlice";
import { ILoginCredentials, IUser } from "@/types/userTypes";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    //TODO:change with env
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    saveCode: builder.mutation<
      {
        url: string;
        status: string;
      },
      ICompilerInitialState["fullCode"]
    >({
      query: (fullCode) => ({
        url: "/compiler/save",
        method: "POST",
        body: fullCode,
      }),
    }),
    loadCode: builder.query<
      { fullCode: ICompilerInitialState["fullCode"] },
      { id: string }
    >({
      query: (params) => ({
        url: "/compiler/load",
        method: "GET",
        params,
      }),
    }),
    login: builder.mutation<IUser, ILoginCredentials>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body: body,
        credentials: "include",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
    getUserDetails: builder.query<IUser, void>({
      query: () => ({
        url: "/user/user-details",
        cache: "no-store",
      }),
    }),
  }),
});

export const {
  useSaveCodeMutation,
  useLoadCodeQuery,
  useLazyLoadCodeQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
} = api;
