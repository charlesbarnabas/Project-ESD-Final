import Logo from "../assets/logo.png";
import SearchIcon from "../assets/search.png";
import WishlistIcon from "../assets/wishlist.png";
import CartIcon from "../assets/cart.png";
import BellIcon from "../assets/bell.png";
import AvatarIcon from "../assets/avatar.png";
import ChevronDownIcon from "../assets/chevron-down.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../utils/store";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export default function Navbar() {
  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const { user, logout } = useStore();
  const navigate = useNavigate();

  const toggleDropdown = useCallback(() => {
    setOpenDropdown(!isOpenDropdown);
  }, [isOpenDropdown]);

  return (
    <div className="w-full flex justify-between py-8 px-12 items-center bg-white fixed z-50 shadow-sm">
      <div className="flex justify-between gap-20">
        <div id="logo" className="min-w-[150px] min-h-[45px]">
          <Link to="/">
            <img src={Logo} alt="petopia-logo" />
          </Link>
        </div>
        <div
          id="search-bar"
          className="flex justify-between items-center min-w-[450px] bg-anti-flash-white rounded-lg px-4 py-1"
        >
          <input
            className="w-full bg-anti-flash-white font-medium text-xs outline-none"
            type="text"
            placeholder="Search Products / brands, etc"
          />
          <img src={SearchIcon} alt="search-icon" className="w-3 h-3" />
        </div>
      </div>
      <div className="flex justify-center items-center gap-12">
        <div id="icons" className="flex justify-between gap-4">
          <Link to="/wishlist">
            <img src={WishlistIcon} alt="wishlist-icon" className="w-5 h-5" />
          </Link>
          <Link to="/cart">
            <img src={CartIcon} alt="cart-icon" className="w-5 h-5" />
          </Link>
          <img src={BellIcon} alt="bell-icon" className="w-5 h-5" />
        </div>
        {user ? (
          <div className="relative inline-block text-left">
            <div
              id="profile"
              className="flex justify-between items-center gap-6 cursor-pointer"
              onMouseEnter={() => toggleDropdown()}
            >
              <div className="flex justify-center items-center gap-3">
                <img src={AvatarIcon} alt="avatar-icon" className="w-6 h-6" />
                <h5 className="font-medium text-sm">{user.username}</h5>
              </div>
              <img
                src={ChevronDownIcon}
                alt="chevron-down-icon"
                className="w-2 h-2"
              />
            </div>

            {isOpenDropdown && (
              <div
                className="origin-top-right absolute mt-2 mr-8 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 left-[-100px]"
                onMouseEnter={() => setOpenDropdown(true)}
                onMouseLeave={() => setOpenDropdown(false)}
              >
                <div
                  className="p-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link
                    to="/settings/profile"
                    className="font-medium block px-4 py-2 text-[16px] hover:bg-[#E1F7FF] rounded-md cursor-pointer"
                  >
                    Profile
                  </Link>
                  <div
                    onClick={() =>
                      toast.warning("This feature isn't available yet.")
                    }
                    className="font-medium block px-4 py-2 text-[16px] hover:bg-[#E1F7FF] rounded-md cursor-pointer"
                  >
                    Purchase
                  </div>
                  <Link
                    to="/settings/address"
                    className="font-medium block px-4 py-2 text-[16px] hover:bg-[#E1F7FF] rounded-md cursor-pointer"
                  >
                    Address
                  </Link>
                  <div
                    onClick={() =>
                      toast.warning("This feature isn't available yet.")
                    }
                    className="font-medium block px-4 py-2 text-[16px] hover:bg-[#E1F7FF] rounded-md cursor-pointer"
                  >
                    Security
                  </div>
                  <Link
                    to="/faq"
                    className="font-medium block px-4 py-2 text-[16px] hover:bg-[#E1F7FF] rounded-md cursor-pointer"
                  >
                    Help & Support
                  </Link>
                  <div
                    onClick={() => {
                      navigate("/");
                      logout();
                      toast.success("Success to Sign Out!");
                    }}
                    className="font-medium block px-4 py-2 text-[16px] hover:bg-[#E1F7FF] rounded-md cursor-pointer"
                  >
                    Sign Out
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to="/auth/signin"
            className="border bg-spiro-disco-ball text-white uppercase font-bold hover:text-spiro-disco-ball hover:bg-white hover:border-spiro-disco-ball py-2 px-4 rounded-md ease-in-out duration-500"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}
