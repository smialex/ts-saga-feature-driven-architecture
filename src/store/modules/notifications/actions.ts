import * as types from "./types";

export type TNotificationType = "info" | "warning" | "error";

interface INotificationOptions {
  autoHideDuration?: number;
  closable?: boolean;
}

export interface INotification {
  type: TNotificationType;
  message: string;
  notificationOptions?: INotificationOptions;
}

export const showNotification = (payload: INotification) =>
  ({
    type: types.NOTIFICATION_SHOW,
    payload,
  } as const);

export const hideNotification = () =>
  ({
    type: types.NOTIFICATION_HIDE,
  } as const);

export type TShowNotification = ReturnType<typeof showNotification>;
export type THideNotification = ReturnType<typeof hideNotification>;
