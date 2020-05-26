import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TRootState } from "../../../types";
import * as actions from "./actions";

const getNotifications = (state: TRootState) => state.common.notifications;

export const useNotifications = () => {
  const notifications = useSelector(getNotifications);
  const dispatch = useDispatch();

  const showNotification = useCallback(
    (payload: actions.INotification) => {
      dispatch(actions.showNotification(payload));
    },
    [dispatch]
  );

  const hideNotification = useCallback(
    (payload: actions.INotification) => {
      dispatch(actions.hideNotification());
    },
    [dispatch]
  );

  return { notifications, hideNotification, showNotification };
};
