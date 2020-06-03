import { put, call } from "redux-saga/effects";
import { workerLoadTodoItems } from "../../../modules/todo/saga";
import { startLoading, stoptLoading } from "../../../../../store/modules/loader";
import { addAllTodosItems } from "../../../modules/todo/actions";
import { TTodoItem, fetchAllTodoItems } from "../../../../../service/api/todoApi";
import { showNotification } from "../../../../../store/modules/notifications";

describe("testing correctly load todo items", () => {
  let saga: ReturnType<typeof workerLoadTodoItems>;

  beforeAll(() => {
    saga = workerLoadTodoItems();
  });

  test("should put startLoading before load todo items", () => {
    const actual = saga.next();
    const expected = put(startLoading());
    expect(actual.value).toEqual(expected);
  });

  test("should load todo items", () => {
    const actual = saga.next();
    const expected = call(fetchAllTodoItems);
    expect(actual.value).toEqual(expected);
  });

  test("should put loaded todo items", () => {
    const todoItems: TTodoItem[] = [
      {
        id: 1,
        userId: 10,
        completed: true,
        title: "title",
      },
    ];
    const actual = saga.next(todoItems);
    const expected = put(addAllTodosItems(todoItems));
    expect(actual.value).toEqual(expected);
  });

  test("should put stopLoaded todo items", () => {
    const actual = saga.next();
    const expected = put(stoptLoading());
    expect(actual.value).toEqual(expected);
  });
});

test("testing failure load todo items", () => {
  const saga = workerLoadTodoItems();
  saga.next();
  const actual = saga.throw(new Error("fail loading"));
  const expected = put(
    showNotification({
      type: "error",
      message: "fail loading",
    })
  );

  expect((actual.value as any).type).toEqual(expected.type);
});
