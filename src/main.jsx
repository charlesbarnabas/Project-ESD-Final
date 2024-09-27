import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import {
  Address,
  Cart,
  Faq,
  Home,
  Payment,
  ProductDetail,
  Profile,
  SignIn,
  SignUp,
} from "./pages/index";
import AppLayout from "./app-layout";
import { Toaster } from "sonner";
import SettingLayout from "./pages/settings/settings-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:name",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/settings",
        element: <SettingLayout />,
        children: [
          {
            path: "/settings/profile",
            element: <Profile />,
          },
          {
            path: "/settings/address",
            element: <Address />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
  {
    path: "/auth/signin",
    element: <SignIn />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-center" richColors />
    <RouterProvider router={router} />
  </React.StrictMode>
);
