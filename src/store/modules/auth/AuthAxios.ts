import { AxiosInstance } from "axios";
import { AuthService } from "./AuthService";
import { refreshToken } from "./AuthApi";
import { createAxiosInterceptors } from "./AuthInterseptors";

type TWithAuthOptoins = {};

export const withAuth = (axiosInstance: AxiosInstance, options: TWithAuthOptoins = {}): AxiosInstance => {
  const { requestInterceptor, errorResponseInterceptor } = createAxiosInterceptors({
    getAxiosInstance: () => axiosInstance,
    getAccessToken: AuthService.getAccessToken.bind(AuthService),
    getRefreshToken: AuthService.getRefreshToken.bind(AuthService),
    onRefreshTokenError: AuthService.resetTokens.bind(AuthService),
    onRefreshTokenSuccess: (accTok: string, refTok: string) => AuthService.setTokensPair.bind(AuthService),
    requestRefreshToken: (refTok: string) => refreshToken(refTok),
  });

  axiosInstance.interceptors.request.use(requestInterceptor, (e) => Promise.reject(e));
  axiosInstance.interceptors.response.use(undefined, errorResponseInterceptor);

  return axiosInstance;
};
