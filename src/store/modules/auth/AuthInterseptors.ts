import axios, { AxiosRequestConfig, AxiosError } from "axios";

export interface IRefreshTokenResult {
  accessToken: string;
  refreshToken: string;
}

interface ICreateInterceptorsParams {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  onRefreshTokenError: () => void;
  onRefreshTokenSuccess: (accessToken: string, refreshToken: string) => void;
  requestRefreshToken: (refreshToken: string) => Promise<IRefreshTokenResult>;
}

let refreshingPromise: ReturnType<(refreshToken: string) => Promise<IRefreshTokenResult>> | null = null;

export const createAxiosInterceptors = ({
  getAccessToken,
  getRefreshToken,
  onRefreshTokenError,
  onRefreshTokenSuccess,
  requestRefreshToken,
}: ICreateInterceptorsParams) => {
  const requestInterceptor = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    let takenAccessToken = null;

    if (refreshingPromise) {
      const { accessToken } = await refreshingPromise;
      takenAccessToken = accessToken;
    } else {
      takenAccessToken = getAccessToken();
    }

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: takenAccessToken ? `Bearer ${takenAccessToken}` : undefined,
      },
    };
  };

  const errorResponseInterceptor = async (error: AxiosError) => {
    const currentRefreshToken = getRefreshToken();

    if (error?.response?.status === 401 && currentRefreshToken) {
      try {
        refreshingPromise = requestRefreshToken(currentRefreshToken);
        const { accessToken, refreshToken } = await refreshingPromise;
        onRefreshTokenSuccess(refreshToken, accessToken);
        refreshingPromise = null;

        return axios({
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (e) {
        refreshingPromise = null;
        onRefreshTokenError();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  };

  return {
    requestInterceptor,
    errorResponseInterceptor,
  };
};
