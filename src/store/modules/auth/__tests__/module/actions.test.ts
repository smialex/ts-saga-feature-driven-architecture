import { login, logout, register, setAuthorized } from "../../module/actions";
import * as types from "../../module/types";

test("should registr action creator return correct action", () => {
  const action = register("username", "password");
  expect(action).toEqual({
    type: types.AUTH_REGISTER,
    username: "username",
    password: "password",
  });
});

test("should login action creator return correct action", () => {
  const action = login("username", "password");
  expect(action).toEqual({
    type: types.AUTH_LOGIN,
    username: "username",
    password: "password",
  });
});

test("should logout action creator return correct action", () => {
  const action = logout();
  expect(action).toEqual({
    type: types.AUTH_LOGOUT,
  });
});

test("should setAuthorized action creator return correct action", () => {
  const action = setAuthorized(true);
  expect(action).toEqual({
    type: types.AUTH_SET_AUTHORIZED,
    isAuthorized: true,
  });
});
