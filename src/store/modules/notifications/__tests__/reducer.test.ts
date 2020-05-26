import { notificationReducer } from "../reducer";
import { INotification, showNotification, hideNotification } from "../actions";

const initState: INotification[] = [
  {
    type: "error",
    message: "error message",
  },
  {
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
  expect(state[2]).toEqual({ type: "warning", message: "warning message" });
});

test("should remove first Notification", () => {
  const action = hideNotification();
  const state = notificationReducer(initState, action);

  expect(state).not.toBe(initState);
  expect(state).toHaveLength(1);
  expect(state[0]).toBe(initState[1]);
});
