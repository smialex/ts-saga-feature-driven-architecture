import { TInferActionTypes } from "../../../types";
import * as actions from "./actions";

const initialNotificationState: actions.INotification[] = [];

type TNotificationState = typeof initialNotificationState;
type TActionsType = TInferActionTypes<typeof actions>;

export const notificationReducer = (state = initialNotificationState, action: TActionsType): TNotificationState => {
  switch (action.type) {
    case "NOTIFICATION/SHOW":
      return [...state, action.payload];
    case "NOTIFICATION/HIDE":
      return state.slice(1);
    default:
      return state;
  }
};
