import axios from "@/config/axios.ts";
import { IResponse } from "../types/common";
import { TodoType } from "@/types/entities";
import { TodoFormType } from "@/validations/todo.schema";

const getTodos = async () => {
  return await axios.get<IResponse<TodoType[]>>("/todo");
};

const createTodo = async (data: TodoFormType) => {
  return await axios.post<IResponse<TodoType>>("/todo", data);
};

const updateTodo = async (id: string, data: TodoFormType) => {
  return await axios.patch<IResponse<TodoType>>(`/todo/${id}`, data);
};

const updateTodoStatus = async (id: string, status: string) => {
  return await axios.patch<IResponse<TodoType>>(`/todo/${id}`, { status });
};

const removeTodo = async (id: string) => {
  return await axios.delete<IResponse<TodoType>>(`/todo/${id}`);
};

const todoApi = {
  getTodos,
  createTodo,
  updateTodo,
  removeTodo,
  updateTodoStatus,
};

export default todoApi;
