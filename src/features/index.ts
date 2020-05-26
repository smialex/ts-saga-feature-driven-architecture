import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { todoReducer, todoSaga } from "./todo";

export const featuresReducer = combineReducers({
  todo: todoReducer,
});

export function* featuresSaga() {
  yield all([todoSaga()]);
}
