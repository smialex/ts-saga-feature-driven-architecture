import { TInferActionTypes } from "../../../../types";
import * as actions from "./actions";
import { AuthService } from "../AuthService";

const isAuthorized = AuthService.getAccessToken() !== null && AuthService.getRefreshToken() !== null;

const initialLoaderState = {
  isAuthorized,
};

type TLoaderState = typeof initialLoaderState;
type TActionsType = TInferActionTypes<typeof actions>;

export const authReducer = (state = initialLoaderState, action: TActionsType): TLoaderState => {
  switch (action.type) {
    case "AUTH/SET_AUTHORIZED":
      return { ...state, isAuthorized: action.isAuthorized };
    default:
      return state;
  }
};
