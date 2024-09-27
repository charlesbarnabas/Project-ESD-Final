import PropTypes from "prop-types";

export default function SettingMenu({
  image,
  alt,
  title,
  subtitle,
  isActive,
  onClickItem,
}) {
  return (
    <div onClick={onClickItem} className="flex gap-3 items-center hover:bg-gray-100 rounded-lg px-2 cursor-pointer">
      <img src={image} alt={alt} className="w-4 h-4" />
      <div className="flex justify-between items-center px-4 py-2 text-gray-700">
        <div className="flex flex-col">
          <span className={`${isActive ? 'text-spiro-disco-ball font-semibold' : 'text-black font-medium'}`}>{title}</span>
          <span className="text-xs text-chinese-black opacity-50">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}

SettingMenu.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClickItem: PropTypes.func.isRequired,
};
