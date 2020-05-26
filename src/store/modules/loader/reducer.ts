import { TInferActionTypes } from "../../../types";
import * as actions from "./actions";

const initialLoaderState = false;

type TLoaderState = boolean;
type TActionsType = TInferActionTypes<typeof actions>;

export const loaderReducer = (state = initialLoaderState, action: TActionsType): TLoaderState => {
  switch (action.type) {
    case "LOADER/START":
      return true;
    case "LOADER/STOP":
      return false;
    default:
      return state;
  }
};
