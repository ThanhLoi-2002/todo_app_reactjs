
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFoundPage from "@/pages/404";
import Login from "@/pages/user/auth/login";
import Register from "@/pages/user/auth/register";
import Home from "@/pages/user/home/home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  //User
  {
    path: "/",
    element: (
      <ProtectedRoute rolesRequired={["USER"]}>
        <Home />
      </ProtectedRoute>
    ),
  },
  // //Admin
  // {
  //   element: (
  //     <ProtectedRoute rolesRequired={["ADMIN"]}>
  //       <AdminLayout />
  //     </ProtectedRoute>
  //   ),
  //   path: "/admin",
  //   children: [
  //     {
  //       path: "products",
  //       element: <Products />,
  //     },
  //   ],
  // },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
