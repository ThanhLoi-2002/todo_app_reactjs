import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const ConfirmModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Xác nhận",
  message = "Bạn có chắc chắn muốn thực hiện thao tác này?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p>{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Xác nhận
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-white ml-2 bg-slate-500 hover:bg-slate-600 rounded"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
