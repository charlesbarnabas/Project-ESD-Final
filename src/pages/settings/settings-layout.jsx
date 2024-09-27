import { Outlet, useLocation } from "react-router-dom";
import SettingSidebar from "../../components/setting-sidebar";
import { useStore } from "../../utils/store";
import Breadcrumb from "../../components/breadcrumb";

export default function SettingLayout() {
  const location = useLocation();
  const { user } = useStore();
  let currentPage = "Settings";

  switch (location.pathname) {
    case "/settings/profile":
      currentPage = "Profile";
      break;
    case "/settings/purchase":
      currentPage = "Purchase";
      break;
    case "/settings/address":
      currentPage = "Address";
      break;
    case "/settings/security":
      currentPage = "Security";
      break;
    default:
      break;
  }

  return (
    <div id="setting" className="flex flex-col gap-16 pt-40 px-20">
      <Breadcrumb page={currentPage} />

      <div className="flex justify-between">
        <div className="h-full w-1/4">
          <SettingSidebar user={user} />
        </div>
        <div className="h-full w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
