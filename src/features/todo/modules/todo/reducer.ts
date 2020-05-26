import { TInferActionTypes } from "../../../../types";
import { TTodoItem } from "../../../../service/api/todoApi";
import * as actions from "./actions";

const initialTodoState = {
  todoItems: [] as TTodoItem[],
};

type TTodoState = typeof initialTodoState;
type TActionsType = TInferActionTypes<typeof actions>;

export function todoReducer(state = initialTodoState, action: TActionsType): TTodoState {
  switch (action.type) {
    case "TODO/SET_ALL":
      return { todoItems: action.items };
    case "TODO/SET_COMPLETE":
      return {
        todoItems: state.todoItems.map((item) => (item.id === action.id ? { ...item, completed: true } : item)),
      };
    default:
      return state;
  }
}
