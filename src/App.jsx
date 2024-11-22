import "./App.css";
import Home from "./components/Home/Home";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Notfound from "./components/Notfound/Notfound";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import { useContext, useEffect } from "react";
import { tokenContext } from "./context/TokenContext";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Details from "./components/Details/Details";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import AllOrders from "./components/AllOrders/AllOrders";
function App() {
  let routers = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element:<ProtectedRoutes><Home /></ProtectedRoutes>  },
        { path: "cart", element:<ProtectedRoutes><Cart /></ProtectedRoutes>  },
        { path: "categories", element:<ProtectedRoutes><Categories /></ProtectedRoutes>  },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "logout", element: <Logout /> },
        { path: "brands", element: <ProtectedRoutes><Brands /> </ProtectedRoutes> },
        { path: "checkout", element: <ProtectedRoutes><Checkout /> </ProtectedRoutes> },
        { path: "details/:id", element: <ProtectedRoutes><Details /> </ProtectedRoutes> },
        { path: "allorders", element: <ProtectedRoutes><AllOrders /> </ProtectedRoutes> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  let { setToken } = useContext(tokenContext);
  useEffect(() => {
    if (localStorage.getItem("userToken"))
      setToken(localStorage.getItem("userToken"));
  }, []);
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

export default App;
