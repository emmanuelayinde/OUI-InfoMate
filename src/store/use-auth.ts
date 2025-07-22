import { create } from "zustand";

import { IAuth, IAuthToken, IUserProfile } from "@/types";
import { deleteCookie, getCookie, setCookie } from "../utils";

export const useAuthStore = create<IAuth>((set) => ({
  isAuthenticated: getCookie("token") !== null,
  userProfile: getCookie("profile") || null,
  userType: getCookie("user_type") || null,

  setUserProfile: (profile: IUserProfile) => {
    set({ userProfile: profile });
    setCookie({ name: "profile", value: profile });
  },

  login: (token: IAuthToken) => {
    setCookie({ name: "token", value: token.access_token });
    setCookie({ name: "user_type", value: token.user_type });
    set({ isAuthenticated: true });
  },

  logout: () => {
    deleteCookie("token");
    deleteCookie("profile");
    deleteCookie("user_type");
    localStorage.removeItem("chat-store");
    set({ userProfile: null, isAuthenticated: false });
  },
}));
