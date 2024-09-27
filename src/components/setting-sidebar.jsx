import PropTypes from "prop-types";
import AvatarIcon from "../assets/avatar.png";
import ProfileIcon from "../assets/settings/profile.png";
import PurchaseIcon from "../assets/settings/purchase.png";
import AddressIcon from "../assets/settings/address.png";
import SecurityIcon from "../assets/settings/security.png";
import FAQIcon from "../assets/settings/faq.png";
import LogoutIcon from "../assets/settings/logout.png";
import SettingMenu from "./setting-menu";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../utils/store";

export default function SettingSidebar({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useStore();

  return (
    <div className="w-72 bg-white shadow-lg rounded-lg p-6">
      {/* User Info Section */}
      <div className="flex gap-6 items-center mb-6">
        <img
          src={AvatarIcon}
          alt="user-avatar"
          className="rounded-full w-12 h-12 mb-2"
        />
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold">{user.username}</h4>
          <h5>{user.phone ?? "-"}</h5>
        </div>
      </div>

      {/* Settings Section */}
      <div className="mb-6">
        <h5 className="text-chinese-black opacity-50 font-semibold text-sm mb-3">
          Settings
        </h5>
        <div className="flex flex-col gap-4">
          <SettingMenu
            image={ProfileIcon}
            alt="profile-icon"
            title="Profile"
            subtitle="Basic information"
            onClickItem={() => navigate("/settings/profile")}
            isActive={location.pathname.includes("/profile")}
          />

          <SettingMenu
            image={PurchaseIcon}
            alt="purchase-icon"
            title="Purchase"
            subtitle="Purchase"
            onClickItem={() =>
              toast.warning("This feature isn't available yet.")
            }
            isActive={location.pathname.includes("/purchase")}
          />

          <SettingMenu
            image={AddressIcon}
            alt="address-icon"
            title="Address"
            subtitle="Manage shipping address"
            onClickItem={() => navigate("/settings/address")}
            isActive={location.pathname.includes("/address")}
          />

          <SettingMenu
            image={SecurityIcon}
            alt="security-icon"
            title="Security"
            subtitle="Change Password"
            onClickItem={() =>
              toast.warning("This feature isn't available yet.")
            }
            isActive={location.pathname.includes("/security")}
          />
        </div>
      </div>

      {/* Others Section */}
      <div>
        <h5 className="text-chinese-black opacity-50 font-semibold text-sm mb-3">
          Others
        </h5>
        <div className="flex flex-col gap-4">
          <SettingMenu
            image={FAQIcon}
            alt="faq-icon"
            title="Help & Support"
            subtitle="Help center, FAQ"
            onClickItem={() => navigate("/faq")}
            isActive={location.pathname.includes("/faq")}
          />

          <SettingMenu
            image={LogoutIcon}
            alt="logout-icon"
            title="Sign Out"
            subtitle="Sign out from Petopia"
            onClickItem={() => {
              navigate("/");
              logout();
              toast.success("Success to Sign Out!");
            }}
            isActive={false}
          />
        </div>
      </div>
    </div>
  );
}

SettingSidebar.propTypes = {
  user: PropTypes.object.isRequired,
};
