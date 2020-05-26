import { AuthService } from "../AuthService";

test("setTokensPair should set access and refresh tokens", () => {
  const accessToken = "access";
  const refreshToken = "refresh";
  AuthService.setTokensPair(accessToken, refreshToken);

  expect(AuthService.getAccessToken()).toBe(accessToken);
  expect(AuthService.getRefreshToken()).toBe(refreshToken);
});

test("resetTokens should reset access and refresh tokens", () => {
  const accessToken = "access";
  const refreshToken = "refresh";
  AuthService.setTokensPair(accessToken, refreshToken);
  AuthService.resetTokens();

  expect(AuthService.getAccessToken()).toBeNull();
  expect(AuthService.getRefreshToken()).toBeNull();
});

test("should trigger an event when the tokens changes", () => {
  const accessToken = "access";
  const refreshToken = "refresh";
  const cb = jest.fn();

  AuthService.subscribe(cb);
  AuthService.setTokensPair(accessToken, refreshToken);

  expect(cb).toHaveBeenCalledTimes(1);
});

test("unsubscribe should remove cb ", () => {
  const accessToken = "access";
  const refreshToken = "refresh";
  const cb = jest.fn();

  AuthService.subscribe(cb);
  AuthService.unsubscribe(cb);
  AuthService.setTokensPair(accessToken, refreshToken);

  expect(cb).not.toHaveBeenCalled();
});
