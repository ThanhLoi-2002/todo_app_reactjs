import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import useUser from "./hooks/useUser";
import { getToken } from "./utils/token";

function App() {
  const token = getToken();
  const { getMe } = useUser();

  useEffect(() => {
    if (token) {
      getMe();
    }
  }, []);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
