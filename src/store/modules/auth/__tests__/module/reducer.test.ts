import { authReducer } from "../../module/reducer";
import { setAuthorized } from "../../module/actions";

test("should change state isAuthorized to true", () => {
  const state = authReducer(undefined, setAuthorized(true));
  expect(state.isAuthorized).toBe(true);
});

test("should change state isAuthorized to false", () => {
  const state = authReducer(undefined, setAuthorized(false));
  expect(state.isAuthorized).toBe(false);
});
