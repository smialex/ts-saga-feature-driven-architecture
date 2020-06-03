import * as types from "./types";

export type TNotificationType = "info" | "warning" | "error";

let notificationId = 1;

interface INotificationOptions {
  autoHideDuration?: number; // in ms
  closable?: boolean;
}

export interface INotification {
  id: number;
  type: TNotificationType;
  message: string;
  notificationOptions?: INotificationOptions;
}

export const showNotification = (payload: Omit<INotification, "id">) =>
  ({
    type: types.NOTIFICATION_SHOW,
    payload: {
      ...payload,
      id: notificationId++,
    },
  } as const);

export const hideNotification = (id: number) =>
  ({
    type: types.NOTIFICATION_HIDE,
    id,
  } as const);

export const hideAllNotification = () =>
  ({
    type: types.NOTIFICATION_HIDE_ALL,
  } as const);

export type TShowNotification = ReturnType<typeof showNotification>;
export type THideNotification = ReturnType<typeof hideNotification>;
export type THideAllNotification = ReturnType<typeof hideAllNotification>;
