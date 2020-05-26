import * as types from "./types";

export const register = (username: string, password: string) =>
  ({
    type: types.AUTH_REGISTER,
    username,
    password,
  } as const);

export const login = (username: string, password: string) =>
  ({
    type: types.AUTH_LOGIN,
    username,
    password,
  } as const);

export const logout = () =>
  ({
    type: types.AUTH_LOGOUT,
  } as const);

export const setAuthorized = (isAuthorized: boolean) =>
  ({
    type: types.AUTH_SET_AUTHORIZED,
    isAuthorized,
  } as const);

export type TRegisterAction = ReturnType<typeof register>;
export type TLoginAction = ReturnType<typeof login>;
export type TLogoutAction = ReturnType<typeof logout>;
export type TAuthorizedZction = ReturnType<typeof setAuthorized>;
