import { useAppSelector } from "@/redux";
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

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Redirect to login if no user
        navigate("/login");
      } else {
        // Redirect based on user role
        if (user.role === "USER") {
          navigate("/");
        } else if (user.role === "ADMIN") {
          navigate("/dashboard");
        }
      }
    }
  }, [isLoading, user]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  } else {
    const userRole = user?.role;

    const hasAccess = userRole && rolesRequired.includes(userRole);
    return hasAccess ? (
      <>{children}</>
    ) : (
      <div className="flex justify-center items-center h-screen">
        {/* Bạn không thể truy cập trang này */}
      </div>
    );
  }
};

export default ProtectedRoute;
