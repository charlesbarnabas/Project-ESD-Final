import PropTypes from "prop-types";

export default function TopBrandCard({ img, alt }) {
  const imageSrc = new URL(`../assets/${img}`, import.meta.url).href;

  return (
    <div id="categories-card" className="w-[145px] h-[145px] p-3 rounded-md shadow-md">
      <img src={imageSrc} alt={alt} />
    </div>
  );
}

// Define prop types
TopBrandCard.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
