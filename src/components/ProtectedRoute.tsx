import Login from "@/pages/user/auth/login";
import { useAppSelector } from "@/redux";
import { handleToast } from "@/utils/toast";
import { removeToken } from "@/utils/token";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  rolesRequired?: string[];
}

const ProtectedRoute: React.FC<Props> = ({
  children,
  rolesRequired = ["ADMIN", "USER"],
}) => {
  const { isLoading, user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const userRole = user?.role;
  const hasAccess = userRole && rolesRequired.includes(userRole);

  useEffect(() => {
    if (!user) {
      // handleToast(false, "Bạn cần phải đăng nhập");
      // removeToken();
      // navigate("/login");
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return hasAccess ? (
    <>{children}</>
  ) : (
    <div className="flex justify-center items-center h-screen">
      Bạn không thể truy cập trang này
    </div>
  );
};

export default ProtectedRoute;
