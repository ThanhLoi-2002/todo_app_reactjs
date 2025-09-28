import { TodoStatus, TodoType, UserRole } from "@/types/entities";
import React from "react";
import Modal from "react-modal";
import FormInput from "../input/formInput";
import useTodo from "@/hooks/useTodo";
import SubmitButton from "../button/SubmitButton";
import { X } from "lucide-react";
import Select from "../select/Select";
import { useAppSelector } from "@/redux";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  todo?: TodoType;
}

const options = [
  { label: "Chưa thực hiện", value: TodoStatus.PENDING },
  { label: "Đã hoàn thành", value: TodoStatus.DONE },
];

const TodoForm: React.FC<Props> = ({ isOpen, closeModal, todo }) => {
  const { todoForm, addTodo, updateTodo } = useTodo(todo, closeModal);
  const { user } = useAppSelector((state) => state.user);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="relative mx-auto mt-10 max-w-sm md:max-w-lg p-6 bg-white rounded-lg shadow-lg border border-gray-300"
    >
      <div className="flex justify-between items-center mb-2">
        <h2>{todo ? "Cập nhật" : "Thêm"} công việc</h2>
        <SubmitButton
          icon={X}
          onClick={closeModal}
          className="bg-red-600 hover:bg-red-700"
        />
      </div>
      <form onSubmit={todoForm.handleSubmit(todo ? updateTodo : addTodo)}>
        <FormInput
          label="Tiêu đề"
          name="title"
          form={todoForm}
          isRequired={true}
        />

        <FormInput label="Mô tả" name="description" form={todoForm} />

        <Select
          form={todoForm}
          name="status"
          label="Trạng thái"
          options={options}
          isRequired={true}
        />
        <div
          className={
            user.role === UserRole.ADMIN && `flex justify-between items-center`
          }
        >
          {user.role === UserRole.ADMIN && (
            <p className="text-sm text-gray-500">
              * Người tạo : {todo ? todo.user?.username : user.username}
            </p>
          )}
          <SubmitButton
            title={todo ? "Cập nhật" : "Thêm"}
            className="bg-blue-600 hover:bg-blue-700 justify-self-end"
          />
        </div>
      </form>
    </Modal>
  );
};

export default TodoForm;
