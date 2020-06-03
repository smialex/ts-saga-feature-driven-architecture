import { notificationReducer } from "../reducer";
import { INotification, showNotification, hideAllNotification, hideNotification } from "../actions";

const initState: INotification[] = [
  {
    id: 100,
    type: "error",
    message: "error message",
  },
  {
    id: 101,
    type: "info",
    message: "info message",
  },
];

test("should add new Notification", () => {
  const action = showNotification({
    type: "warning",
    message: "warning message",
  });
  const state = notificationReducer(initState, action);

  expect(state).not.toBe(initState);
  expect(state).toHaveLength(3);
  expect(state[0]).toBe(initState[0]);
  expect(state[1]).toBe(initState[1]);
  expect(state[2]).toEqual({ id: 1, type: "warning", message: "warning message" });
});

test("should remove all Notifications", () => {
  const action = hideAllNotification();
  const state = notificationReducer(initState, action);

  expect(state).not.toBe(initState);
  expect(state).toHaveLength(0);
});

test("should remove Notification by id", () => {
  const action = hideNotification(100);
  const state = notificationReducer(initState, action);

  expect(state).not.toBe(initState);
  expect(state).toHaveLength(1);
  expect(state[0]).toBe(initState[1]);
});
