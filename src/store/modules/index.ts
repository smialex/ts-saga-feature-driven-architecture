import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { loaderReducer } from "./loader";
import { authReducer, authSaga } from "./auth";
import { notificationReducer, notificationSaga } from "./notifications";

export const commonReducers = combineReducers({
  loader: loaderReducer,
  auth: authReducer,
  notifications: notificationReducer,
});

export function* commonSaga() {
  yield all([authSaga(), notificationSaga()]);
}
