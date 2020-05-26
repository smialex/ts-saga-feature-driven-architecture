import axios from "axios";

export interface ILoginTokenResult {
  accessToken: string;
  refreshToken: string;
}

export interface ILogoutResult {
  success: boolean;
}

export interface IRegisterResult extends ILogoutResult {}

export const login = async (username: string, password: string) => {
  const { data } = await axios.post<ILoginTokenResult>("/auth/login", {
    username,
    password,
  });
  return data;
};

export const logout = async () => {
  const { data } = await axios.post<ILogoutResult>("/auth/logout");
  return data;
};

export const register = async (username: string, password: string) => {
  const { data } = await axios.post<IRegisterResult>("/auth/register", {
    username,
    password,
  });
  return data;
};

export const refreshToken = async (refreshToken: string) => {
  const { data } = await axios.post<ILoginTokenResult>(`/auth/refresh`, {
    refreshToken,
  });

  return data;
};
