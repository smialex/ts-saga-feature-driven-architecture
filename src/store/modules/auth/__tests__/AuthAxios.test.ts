import axios, { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { IRefreshTokenResult, createAxiosInterceptors } from "../AuthInterseptors";

test("Correctly retries request when got 401 with new token", async () => {
  let client: AxiosInstance;
  let mock: MockAdapter;

  let initAccessToken: string = "access";
  let accessToken: string | null = "access";
  let refreshToken: string | null = "refresh";

  const refreshResponse: IRefreshTokenResult = {
    accessToken: "access2",
    refreshToken: "refresh2",
  };

  const getAxiosInstance = () => client;
  const getAccessToken = jest.fn(() => accessToken);
  const getRefreshToken = jest.fn(() => refreshToken);
  const onRefreshTokenError = jest.fn(() => {
    accessToken = null;
    refreshToken = null;
  });
  const onRefreshTokenSuccess = jest.fn((accessT, refreshT) => {
    accessToken = accessT;
    refreshToken = refreshT;
  });
  const requestRefreshToken = jest.fn(async (refTok: string) => {
    return Promise.resolve(refreshResponse);
  });

  const { requestInterceptor, errorResponseInterceptor } = createAxiosInterceptors({
    getAxiosInstance,
    getAccessToken,
    getRefreshToken,
    onRefreshTokenError,
    onRefreshTokenSuccess,
    requestRefreshToken,
  });

  client = axios.create();
  client.interceptors.request.use(requestInterceptor, (e) => Promise.reject(e));
  client.interceptors.response.use(undefined, errorResponseInterceptor);
  mock = new MockAdapter(client);

  mock.onGet("/users").reply((config) => {
    const { Authorization } = config.headers;

    if (Authorization === `Bearer ${initAccessToken}`) return [401];
    if (Authorization === `Bearer ${refreshResponse.accessToken}`) return [200, {}];
    return [404];
  });

  await client.get("/users");
  expect(mock.history.get.length).toBe(2);
  expect(mock.history.get[1].headers.Authorization).toBe(`Bearer ${refreshResponse.accessToken}`);
});

test("Does not consumes token more than once", async () => {
  let client: AxiosInstance;
  let mock: MockAdapter;

  let initAccessToken: string = "access";
  let accessToken: string | null = "access";
  let refreshToken: string | null = "refresh";

  const refreshResponse: IRefreshTokenResult = {
    accessToken: "access2",
    refreshToken: "refresh2",
  };

  const getAxiosInstance = () => client;
  const getAccessToken = jest.fn(() => accessToken);
  const getRefreshToken = jest.fn(() => refreshToken);
  const onRefreshTokenError = jest.fn(() => {
    accessToken = null;
    refreshToken = null;
  });
  const onRefreshTokenSuccess = jest.fn((accessT, refreshT) => {
    accessToken = accessT;
    refreshToken = refreshT;
  });
  const requestRefreshToken = jest.fn(async (refTok: string) => {
    return Promise.resolve(refreshResponse);
  });

  const { requestInterceptor, errorResponseInterceptor } = createAxiosInterceptors({
    getAxiosInstance,
    getAccessToken,
    getRefreshToken,
    onRefreshTokenError,
    onRefreshTokenSuccess,
    requestRefreshToken,
  });

  client = axios.create();
  client.interceptors.request.use(requestInterceptor, (e) => Promise.reject(e));
  client.interceptors.response.use(undefined, errorResponseInterceptor);
  mock = new MockAdapter(client);

  mock.onGet("/users").reply((config) => {
    const { Authorization } = config.headers;
    console.log(Authorization);

    if (Authorization === `Bearer ${initAccessToken}`) return [401];
    if (Authorization === `Bearer ${refreshResponse.accessToken}`) return [200, {}];
    return [404];
  });

  await Promise.all([client.get("/users"), client.get("/users")]);
  expect(requestRefreshToken).toHaveBeenCalledTimes(1);
});
