import SubmitButton from "@/components/shared/button/SubmitButton";
import TodoList from "@/components/shared/todo/todoList";
import useAuth from "@/hooks/useAuth";

const Home = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen px-8">
      <div className="flex justify-between items-center py-4 border-b">
        <h2>Danh sách công việc</h2>
        <SubmitButton title={"Đăng xuất"} onClick={logout} className='bg-slate-900 hover:bg-slate-800'/>
      </div>
        
        <TodoList />
    </div>
  );
};

export default Home;
