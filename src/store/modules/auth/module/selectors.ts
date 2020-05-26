import { useCallback } from "react";
import { useDispatch } from "react-redux";
import * as actions from "./actions";
import { TRootState } from "../../../../types";

export const selectIsAuthorized = (state: TRootState) => state.common.auth.isAuthorized;

export const useAuthRegistration = () => {
  const dispatch = useDispatch();

  const login = useCallback((username: string, password: string) => dispatch(actions.login(username, password)), [
    dispatch,
  ]);

  const logout = useCallback(() => dispatch(actions.logout()), [dispatch]);

  const register = useCallback((username: string, password: string) => dispatch(actions.register(username, password)), [
    dispatch,
  ]);

  return { login, logout, register };
};
