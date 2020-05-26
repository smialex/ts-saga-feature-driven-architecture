import { all } from "redux-saga/effects";
import { featuresSaga } from "../features";
import { commonSaga } from "./modules";

export function* rootSaga() {
  yield all([featuresSaga(), commonSaga()]);
}
