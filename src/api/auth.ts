import {
  IAuthToken,
  ILoginCredentials,
  IRegisterCredentials,
  IUserProfile,
} from "@/types";
import { api, authApi } from "./axios";

export const registerApi = async (
  data: IRegisterCredentials
): Promise<IUserProfile> => {
  const response = await authApi.post<IUserProfile>("/register", data);
  return response.data;
};

export const loginApi = async (
  data: ILoginCredentials
): Promise<IAuthToken> => {
  const response = await authApi.post<IAuthToken>("/login", data);
  return response.data;
};

export const getCurrentUserApi = async (): Promise<IUserProfile> => {
  const response = await api.get("/me");
  return response.data;
};
