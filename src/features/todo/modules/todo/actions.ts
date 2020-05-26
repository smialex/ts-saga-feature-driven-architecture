import * as types from "./types";
import { TTodoItem, TTodoItemId } from "../../../../service/api/todoApi";

export const addAllTodosItems = (items: TTodoItem[]) =>
  ({
    type: types.SET_ALL,
    items,
  } as const);

export const setCompleteTodoItem = (id: TTodoItemId) =>
  ({
    type: types.SET_COMPLETE,
    id,
  } as const);

export const loadTodoItems = () =>
  ({
    type: types.LOAD_ALL_TODO_ITEMS,
  } as const);
