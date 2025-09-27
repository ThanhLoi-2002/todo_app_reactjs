import useTodo from "@/hooks/useTodo";
import { TodoStatus, TodoType, UserRole } from "@/types/entities";
import { useEffect, useState } from "react";
import SubmitButton from "../button/SubmitButton";
import { Edit, Plus, Trash } from "lucide-react";
import TodoForm from "./todoForm";
import { useAppSelector } from "@/redux";
import ConfirmModal from "../modal/confirmModal";

const TodoList = () => {
  const { getTodos, removeTodo, updateTodoStatus } = useTodo();
  const { todos } = useAppSelector((state) => state.todo);
  const { user } = useAppSelector((state) => state.user);
  const [isOpenTodoForm, setIsOpenTodoForm] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModa] = useState(false);
  const [todoIdDeleted, setTodoIdDeleted] = useState("");
  const [todoSelected, setTodoIdSelected] = useState<TodoType>(null);

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className="">
      <div className="flex justify-end">
        {user.role === UserRole.USER && (
          <SubmitButton
            title={"Tạo công việc"}
            onClick={() => {
              setTodoIdSelected(null);
              setIsOpenTodoForm(true);
            }}
            icon={Plus}
            className="bg-green-700 hover:bg-green-800"
          />
        )}
      </div>
      <table className="min-w-full border-collapse border border-gray-200 mt-8">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">STT</th>
            {user.role === UserRole.ADMIN && (
              <th className="border border-gray-300 p-2">Người tạo</th>
            )}
            <th className="border border-gray-300 p-2">Tiêu đề</th>
            <th className="border border-gray-300 p-2">Mô tả</th>
            <th className="border border-gray-300 p-2">Trạng thái</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              {user.role === UserRole.ADMIN && (
                <td className="border border-gray-300 p-2 max-w-xs truncate">
                  {todo.user?.username}
                </td>
              )}
              <td className="border border-gray-300 p-2 max-w-xs truncate">
                {todo.title}
              </td>
              <td className="border border-gray-300 p-2 max-w-xs truncate">
                {todo.description}
              </td>
              <td
                className={`border border-gray-300 p-2 text-center text-white `}
              >
                <div
                  onClick={() => {
                    updateTodoStatus(
                      todo.id,
                      todo.status == TodoStatus.DONE
                        ? TodoStatus.PENDING
                        : TodoStatus.DONE
                    );
                  }}
                  className={`${
                    todo.status == TodoStatus.DONE
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  } cursor-pointer`}
                >
                  {todo.status == TodoStatus.DONE
                    ? "Hoàn thành"
                    : "Chưa thực hiện"}
                </div>
              </td>
              <td className="border border-gray-300 p-2">
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setTodoIdSelected(todo);
                      setIsOpenTodoForm(true);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => {
                      setTodoIdDeleted(todo.id);
                      setIsOpenConfirmModa(true);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TodoForm
        isOpen={isOpenTodoForm}
        closeModal={() => setIsOpenTodoForm(false)}
        todo={todoSelected}
      />
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        onClose={() => setIsOpenConfirmModa(false)}
        onConfirm={() => removeTodo(todoIdDeleted)}
      />
    </div>
  );
};

export default TodoList;
