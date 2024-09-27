import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { useHome } from "./pages/home/hooks";

export default function AppLayout() {
  const location = useLocation();
  const { state } = useHome();

  // Check if the current path starts with "/auth"
  const hideNavbar = location.pathname.startsWith("/auth");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
      {!hideNavbar && state.categories.length > 0 && (
        <Footer categories={state.categories} />
      )}
    </>
  );
}
