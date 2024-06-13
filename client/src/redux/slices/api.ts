import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ICompilerInitialState } from "./compilerSlice";
import {
  ICode,
  ILoginCredentials,
  ISignupCredentials,
  IUser,
} from "@/types/userTypes";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    //TODO:change with env
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  tagTypes: ["myCodes", "allCodes"],
  endpoints: (builder) => ({
    saveCode: builder.mutation<
      {
        url: string;
        status: string;
      },
      ICode
    >({
      query: (body) => ({
        url: "/compiler/save",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["myCodes", "allCodes"],
    }),
    loadCode: builder.query<
      { fullCode: ICompilerInitialState["fullCode"]; isOwner: boolean },
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
    signup: builder.mutation<IUser, ISignupCredentials>({
      query: (body) => ({
        url: "/user/signup",
        method: "POST",
        body: body,
        credentials: "include",
      }),
    }),
    getUserDetails: builder.query<IUser, void>({
      query: () => ({
        url: "/user/user-details",
        cache: "no-store",
      }),
    }),
    getMyCodes: builder.query<ICode[], void>({
      query: () => ({
        url: "/user/my-codes",
      }),
      providesTags: ["myCodes"],
    }),
    deleteCode: builder.mutation<void, { _id: string }>({
      query: ({ _id }) => ({
        url: `/compiler/delete/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["myCodes", "allCodes"],
    }),
    editCode: builder.mutation<
      void,
      { fullCode: ICompilerInitialState["fullCode"]; _id: string }
    >({
      query: ({ fullCode, _id }) => ({
        url: `/compiler/edit/${_id}`,
        method: "PUT",
        body: fullCode,
      }),
    }),
    getAllCodes: builder.query<ICode[], void>({
      query: () => ({
        url: "/compiler",
      }),
      providesTags: ["allCodes"],
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
  useSignupMutation,
  useGetMyCodesQuery,
  useDeleteCodeMutation,
  useEditCodeMutation,
  useGetAllCodesQuery,
} = api;
