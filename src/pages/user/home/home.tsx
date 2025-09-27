import SubmitButton from "@/components/shared/button/SubmitButton";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import { getToken } from "@/utils/token";
import { useEffect } from "react";

const Home = () => {
  const { logout } = useAuth();
  const token = getToken();
  const { getMe } = useUser();

  useEffect(() => {
    if (token) {
      getMe();
    }
  }, []);
  return (
    <div className="min-h-screen">
      Trang home
      <SubmitButton title={"Đăng xuất"} onClick={logout} />
    </div>
  );
};

export default Home;
