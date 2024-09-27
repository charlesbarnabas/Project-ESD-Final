import PropTypes from "prop-types";
import StarIcon from "../assets/star.png";
import { priceFormatter } from "../utils/utils";
import { Link } from "react-router-dom";

export default function ProductCard({
  image,
  review,
  name,
  price,
  discount,
  alt,
  isFlashsale,
}) {
  const imageSrc = new URL(`../assets/${image}`, import.meta.url).href;
  const ref =
    name != "" && encodeURIComponent(name.toLowerCase().replaceAll(" ", "_"));

  return (
    <Link
      to={`/products/${ref}`}
      className="flex flex-col gap-3 w-[240px] h-[370px] pt-[18px] px-4 pb-8 rounded-lg shadow-md z-10"
    >
      <img src={imageSrc} alt={alt} className="w-[207px] h-[207px]" />
      <div className="flex justify-start items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <img
            key={index}
            src={StarIcon}
            alt={`star-${index}`}
            className="w-3 h-3"
          />
        ))}
        <span className="font-semibold text-[16px] text-chinese-black opacity-50">
          ({review})
        </span>
      </div>
      <h3 className="font-medium text-[16px]]">{name}</h3>
      <div id="price" className="flex justify-start gap-2">
        <span
          className={`font-medium text-sm ${
            isFlashsale ? "text-orange-soda" : "text-spiro-disco-ball"
          }`}
        >
          {priceFormatter(price)}
        </span>
        {isFlashsale && (
          <span className="font-medium text-sm line-through text-chinese-black opacity-50">
            {priceFormatter(discount)}
          </span>
        )}
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  review: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number,
  alt: PropTypes.string.isRequired,
  isFlashsale: PropTypes.bool.isRequired,
};
