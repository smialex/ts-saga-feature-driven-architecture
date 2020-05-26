import axios from "axios";

export type TTodoItemId = number;

export type TTodoItem = {
  userId: number;
  id: TTodoItemId;
  title: string;
  completed: boolean;
};

const todoApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const fetchAllTodoItems = async (): Promise<TTodoItem[]> => {
  const { data } = await todoApi.get<TTodoItem[]>("/todos");
  return data;
};

export const fetchTodoItemById = async (id: number): Promise<TTodoItem> => {
  const { data } = await todoApi.get<TTodoItem>("/todos", { params: { id } });
  return data;
};
