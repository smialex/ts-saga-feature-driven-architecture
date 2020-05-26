import { TRootState } from "../../../../types";

export const selectTodoItems = (state: TRootState) => state.features.todo.todoItems;
