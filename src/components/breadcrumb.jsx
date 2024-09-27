import { Link } from "react-router-dom";
import LeftArrowIcon from "../assets/arrow-left.png";
import PropTypes from "prop-types";

export default function Breadcrumb({ page }) {
  return (
    <Link to="/" id="breadcrumb" className="flex gap-6 items-center">
      <img src={LeftArrowIcon} alt="left-arrow-icon" className="w-5 h-5" />
      <div className="flex gap-2 items-center">
        <span className="text-sm text-chinese-black opacity-50">Home</span>
        <span className="text-sm font-semibold text-chinese-black">/</span>
        <span className="text-chinese-black text-sm">{page}</span>
      </div>
    </Link>
  );
}

Breadcrumb.propTypes = {
  page: PropTypes.string.isRequired,
};
