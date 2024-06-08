import { ICompilerInitialState } from "@/redux/slices/compilerSlice";

export interface IUser {
  username: string;
  picture: string;
  email: string;
  saveCodes: string[];
}

export interface ILoginCredentials {
  userId: string;
  password: string;
}

export interface ISignupCredentials {
  username: string;
  email: string;
  password: string;
}

export interface ICode {
  fullCode?: ICompilerInitialState["fullCode"];
  title: string;
  _id?: string;
}
