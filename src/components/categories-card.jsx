import PropTypes from "prop-types";

export default function CategoriesCard({ img, alt, label }) {
  const imageSrc = new URL(`../assets/${img}`, import.meta.url).href;

  return (
    <div
      id="categories-card"
      className="w-[170px] h-[180px] flex flex-col items-center gap-[10px]"
    >
      <img src={imageSrc} alt={alt} />
      <h5 className="font-medium text-[16px]">{label}</h5>
    </div>
  );
}

// Define prop types
CategoriesCard.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
