import { showNotification, hideNotification } from "../actions";
import { notificationWorker } from "../saga";
import { delay, put } from "redux-saga/effects";

test("should auto hide notification then has autoHideDuration option ", () => {
  const action = showNotification({
    message: "autohide",
    type: "info",
    notificationOptions: { autoHideDuration: 1000 },
  });

  const saga = notificationWorker(action);

  expect(saga.next().value).toEqual(delay(action.payload.notificationOptions?.autoHideDuration!));
  expect(saga.next().value).toEqual(put(hideNotification(action.payload.id)));
});
