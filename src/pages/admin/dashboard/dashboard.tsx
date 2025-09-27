import SubmitButton from "@/components/shared/button/SubmitButton";
import TodoList from "@/components/shared/todo/todoList";
import useAuth from "@/hooks/useAuth";

const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen px-8">
      <div className="flex justify-between items-center p-4 border-b">
        <h2>Danh sách công việc của tất cả user</h2>
        <SubmitButton
          title={"Đăng xuất"}
          onClick={logout}
          className="bg-slate-900 hover:bg-slate-800"
        />
      </div>

      <TodoList />
    </div>
  );
};

export default Dashboard;
