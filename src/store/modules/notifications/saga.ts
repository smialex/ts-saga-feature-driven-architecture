import { takeEvery, delay, put } from "redux-saga/effects";
import { NOTIFICATION_SHOW } from "./types";
import { hideNotification, TShowNotification } from "./actions";

export function* notificationWorker(action: TShowNotification) {
  const {
    id,
    notificationOptions: { autoHideDuration },
  } = action.payload as Required<typeof action.payload>;
  yield delay(autoHideDuration!);
  yield put(hideNotification(id));
}

export function* notificationSaga() {
  yield takeEvery(
    (action: any) =>
      action.type === NOTIFICATION_SHOW &&
      !!(action as TShowNotification).payload.notificationOptions?.autoHideDuration,
    notificationWorker
  );
}
