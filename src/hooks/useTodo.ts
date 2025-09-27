import { handleToast } from "@/utils/toast";
import { useEffect, useState } from "react";
import { TodoStatus, TodoType } from "@/types/entities";
import todoApi from "@/services/todoApi";
import { TodoForm, TodoFormType } from "@/validations/todo.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@/redux";
import { todoActions } from "@/redux/slice/todoSlice";

const todoDefaultValues: TodoFormType = {
  title: "",
  status: TodoStatus.PENDING,
  description: "",
};

export default function useUser(todo?: TodoType, onClose?: () => void) {
  const dispatch = useAppDispatch();

  const todoForm = useForm<TodoFormType>({
    resolver: yupResolver(TodoForm),
    defaultValues: todoDefaultValues,
  });

  const getTodos = async () => {
    try {
      const { status, data }: any = await todoApi.getTodos();
      status && dispatch(todoActions.getTodos(data));
    } catch (e) {
      handleToast(false, e.message);
    }
  };

  const addTodo = async (values: TodoFormType) => {
    try {
      const { status, message, data }: any = await todoApi.createTodo(values);
      handleToast(status, message);
      if (status) {
        dispatch(todoActions.addTodo(data));
        todoForm.reset();
        onClose && onClose();
      }
    } catch (e: any) {
      handleToast(false, e.message);
    }
  };

  const updateTodo = async (values: TodoFormType) => {
    try {
      const { status, message, data }: any = await todoApi.updateTodo(
        todo.id,
        values
      );

      handleToast(status, message);
      if (status) {
        dispatch(todoActions.updateTodo(data));
        todoForm.reset();
        onClose && onClose();
      }
    } catch (e: any) {
      handleToast(false, e.message);
    }
  };

  const updateTodoStatus = async (id: string, todoStatus: string) => {
    try {
      const { status, message, data }: any = await todoApi.updateTodoStatus(
        id,
        todoStatus
      );

      handleToast(status, message);
      if (status) {
        dispatch(todoActions.updateTodo(data));
      }
    } catch (e: any) {
      handleToast(false, e.message);
    }
  };

  const removeTodo = async (id: string) => {
    try {
      const { status, message }: any = await todoApi.removeTodo(id);

      handleToast(status, message);
      status && dispatch(todoActions.removeTodo(id));
    } catch (e: any) {
      handleToast(false, e.message);
    }
  };

  useEffect(() => {
    if (todo) {
      todoForm.reset({
        title: todo.title,
        description: todo.description || "",
        status: todo.status,
      });
    } else {
      todoForm.reset(todoDefaultValues);
    }
  }, [todo]);

  return {
    todoForm,
    getTodos,
    addTodo,
    updateTodo,
    removeTodo,
    updateTodoStatus,
  };
}
