import { TodoType } from "@/types/entities";
import { handleToast } from "@/utils/toast";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  todos: TodoType[];
}

const initialState: IState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    handleError(state, action) {
      const error = action.payload;
      handleToast(false, error);
    },

    getTodos(state, action: PayloadAction<TodoType[]>) {
      state.todos = action.payload;
    },

    addTodo(state, action: PayloadAction<TodoType>) {
      state.todos = [action.payload, ...state.todos];
    },

    updateTodo(state, action: PayloadAction<TodoType>) {
      state.todos = state.todos.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
    },

    removeTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
