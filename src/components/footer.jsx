import PropTypes from "prop-types";
import FacebookIcon from "../assets/socials/facebook.png";
import TwitterIcon from "../assets/socials/twitter.png";
import InstagramIcon from "../assets/socials/instagram.png";
import TiktokIcon from "../assets/socials/tiktok.png";
import SnapchatIcon from "../assets/socials/snapchat.png";
import AndroidIcon from "../assets/android-logo.png";
import AppleIcon from "../assets/apple-logo.png";

export default function Footer({ categories }) {
  return (
    <div
      id="footer"
      className="w-full h-full flex justify-between gap-36 py-20 px-20"
    >
      <div id="list-categories" className="flex justify-between gap-40">
        {Array.from({ length: 3 }, (_, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 justify-start items-start w-32"
          >
            <h4 className="text-sm font-bold text-spiro-disco-ball uppercase">
              Categories
            </h4>
            {categories.map((c, id) => (
              <span key={id} className="text-sm font-medium">
                {c.label}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div id="socials-info" className="flex flex-col gap-16 w-[562px]">
        <div id="socials-platform" className="flex justify-between">
          <div id="socials" className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-spiro-disco-ball uppercase">
              Socials
            </h4>
            <div className="flex justify-between gap-4">
              <img
                className="w-[30px] h-[30px]"
                src={FacebookIcon}
                alt="facebook"
              />
              <img
                className="w-[30px] h-[30px]"
                src={TwitterIcon}
                alt="twitter"
              />
              <img
                className="w-[30px] h-[30px]"
                src={InstagramIcon}
                alt="instagram"
              />
              <img
                className="w-[30px] h-[30px]"
                src={TiktokIcon}
                alt="tiktok"
              />
              <img
                className="w-[30px] h-[30px]"
                src={SnapchatIcon}
                alt="snapchat"
              />
            </div>
          </div>
          <div id="platforms" className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-spiro-disco-ball uppercase">
              Platforms
            </h4>
            <div className="flex justify-between gap-4">
              <img
                className="w-[30px] h-[30px]"
                src={AndroidIcon}
                alt="android"
              />
              <img className="w-[30px] h-[30px]" src={AppleIcon} alt="apple" />
            </div>
          </div>
        </div>

        <div id="subscribe" className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Your Email"
              className="w-[412px] p-3 text-sm border border-chinese-black opacity-50 outline-none"
            />
            <button className="text-white bg-spiro-disco-ball border py-3 px-8 uppercase hover:text-spiro-disco-ball hover:bg-white hover:border hover:border-spiro-disco-ball font-bold text-sm ease-in-out duration-500">
              subscribe
            </button>
          </div>
          <p className="font-medium text-xs">
            By clicking the SUBSCRIBE button, you are agreeing to our{" "}
            <span className="text-orange-soda underline">
              Privacy & Cookie Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  categories: PropTypes.array.isRequired,
};
