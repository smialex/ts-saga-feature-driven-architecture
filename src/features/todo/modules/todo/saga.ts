import { takeEvery, all, put, call } from "redux-saga/effects";
import { LOAD_ALL_TODO_ITEMS } from "./types";
import { fetchAllTodoItems, TTodoItem } from "../../../../service/api/todoApi";
import { startLoading, stoptLoading } from "../../../../store/modules/loader";
import { showNotification } from "../../../../store/modules/notifications";
import { addAllTodosItems } from "./actions";

export function* workerLoadTodoItems() {
  try {
    yield put(startLoading());
    const todoItems: TTodoItem[] = yield call(fetchAllTodoItems);
    yield put(addAllTodosItems(todoItems));
  } catch (e) {
    yield put(
      showNotification({
        type: "error",
        message: e && e.message,
      })
    );
  } finally {
    yield put(stoptLoading());
  }
}

export function* watchLoadTodoItems() {
  yield takeEvery(LOAD_ALL_TODO_ITEMS, workerLoadTodoItems);
}

export function* todoSaga() {
  yield all([watchLoadTodoItems()]);
}
