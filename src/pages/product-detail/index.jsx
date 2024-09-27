import { useParams } from "react-router-dom";
import { useProductDetail } from "./hooks";
import { useEffect } from "react";
import StarIcon from "../../assets/star.png";
import { imageSource, priceFormatter } from "../../utils/utils";
import ReviewCard from "../../components/review-card";
import SortIcon from "../../assets/sort.png";
import ChevronDownIcon from "../../assets/chevron-down.png";
import HeartIcon from "../../assets/heart.png";
import WishlistIcon from "../../assets/wishlist.png";
import Breadcrumb from "../../components/breadcrumb";

export default function ProductDetail() {
  const { name } = useParams();
  const { state, method } = useProductDetail();

  useEffect(() => {
    if (name && name != "") {
      method.fetchProduct(name);
    }
  }, [name]);

  useEffect(() => {
    if (state.product) {
      method.fetchWishlist(state.product);
    }
  }, [state.product]);

  return (
    <div className="w-full h-full z-50 px-20">
      <div className="flex flex-col gap-20 pt-32">
        {state.product && <Breadcrumb page={state.product.name} />}

        {state.product && (
          <div className="flex flex-col gap-20">
            <div id="header" className="flex justify-around gap-60">
              <div id="description" className="flex flex-col gap-6">
                <h1 className="font-semibold text-5xl break-words max-w-[650px]">
                  {state.product.name}
                </h1>
                <div id="price-review" className="flex justify-start gap-28">
                  <h4 className="text-2xl">
                    {priceFormatter(state.product.price)}
                  </h4>
                  <div className="flex justify-start items-center gap-3">
                    {Array.from({ length: 5 }, (_, index) => (
                      <img
                        key={index}
                        src={StarIcon}
                        alt={`star-${index}`}
                        className="w-3 h-3"
                      />
                    ))}
                    <span className="font-semibold text-[16px] text-chinese-black">
                      5.0 / 5.0
                    </span>
                    <span className="font-semibold text-[16px] text-chinese-black opacity-50">
                      ({state.product.review})
                    </span>
                  </div>
                </div>
                <div id="short-description">
                  <p className="text-[16px] max-w-[440px] break-words">
                    These treats are formulated to promote a urinary environment
                    that reduces the risk of developing struvite & calcium
                    oxalate crystals when fed with a compatible S+OXSHIELD food.
                  </p>
                </div>
                <div className="flex gap-16">
                  <div id="counter" className="flex items-center gap-4">
                    <button
                      className={`text-white rounded-md w-8 h-8 font-medium ${
                        state.amount > 1
                          ? "bg-spiro-disco-ball"
                          : "bg-gainsboro"
                      }`}
                      disabled={state.amount == 1}
                      onClick={() => method.changeAmount(state.amount - 1)}
                    >
                      -
                    </button>
                    <span className="font-semibold text-[16px] w-3 text-center">
                      {state.amount}
                    </span>
                    <button
                      className="text-white bg-spiro-disco-ball rounded-md w-8 h-8 font-medium"
                      onClick={() => method.changeAmount(state.amount + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => method.addToCart()}
                    className="border text-white bg-spiro-disco-ball font-semibold text-xs py-3 px-10 rounded-md hover:bg-white hover:text-spiro-disco-ball hover:border-spiro-disco-ball duration-500"
                  >
                    Add to Cart
                  </button>
                </div>
                <h4 className="font-medium text-[16px]">
                  Free 3-5 day shipping
                </h4>
                <div
                  className="flex gap-4 items-center cursor-pointer select-none"
                  onClick={() => method.toggleToWishlist(!state.onWishlist)}
                >
                  {state.onWishlist ? (
                    <img
                      src={WishlistIcon}
                      alt="wishlist-icon"
                      className="w-5 h-5"
                    />
                  ) : (
                    <img src={HeartIcon} alt="heart-icon" className="w-5 h-5" />
                  )}
                  <h5 className="font-medium text-[16px] opacity-50">
                    Add to Wishlist
                  </h5>
                </div>
              </div>
              <div id="image">
                <img
                  src={imageSource(state.product.image)}
                  alt={state.product.alt}
                  className="w-[400px] h-[400px]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div className="w-full flex justify-center">
                <button
                  onClick={() => method.changeActiveSection(1)}
                  className={`${
                    state.activeSection == 1 &&
                    "border-b-2 border-black font-semibold"
                  } duration-100 border-b font-medium text-xl py-2 min-w-[800px] bg-none text-center`}
                >
                  Product Details
                </button>
                <button
                  onClick={() => method.changeActiveSection(2)}
                  className={`${
                    state.activeSection == 2 &&
                    "border-b-2 border-black font-semibold"
                  } duration-100 border-b font-medium text-xl py-2 min-w-[800px] bg-none text-center`}
                >
                  Rating & Reviews
                </button>
              </div>

              {state.activeSection == 1 ? (
                <div className="flex flex-col gap-10">
                  <h1 className="font-medium text-2xl">
                    Product Specification
                  </h1>
                  <div className="flex justify-between gap-4">
                    <div className="flex flex-col gap-6">
                      <div className="flex justify-between gap-44">
                        <span className="text-xl">Category</span>
                        <span className="text-xl">Food</span>
                      </div>
                      <div className="flex justify-between gap-44">
                        <span className="text-xl">Stok</span>
                        <span className="text-xl">12</span>
                      </div>
                      <div className="flex justify-between gap-44">
                        <span className="text-xl">Brand</span>
                        <span className="text-xl">Hill&apos;s</span>
                      </div>
                      <div className="flex justify-between gap-44">
                        <span className="text-xl">Storage Period</span>
                        <span className="text-xl">12 Month</span>
                      </div>
                      <div className="flex justify-between gap-44">
                        <span className="text-xl">Food Type</span>
                        <span className="text-xl">Wet Food</span>
                      </div>
                      <div className="flex justify-between gap-44">
                        <span className="text-xl">Country Of Origin</span>
                        <span className="text-xl">Germany</span>
                      </div>
                      <div className="flex justify-between gap-44">
                        <span className="text-xl">Animal Type</span>
                        <span className="text-xl">Dog</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg">
                      Because dogs with food sensitivities, or related skin
                      conditions also need an occasional treat, Hill&apos;s,
                      nutritionists and veterinarians have developed special
                      treats for dogs being fed Prescription Diet. These treats
                      complement Prescription Diet d/d, Derm Complete,
                      Gastrointestinal Biome, i/d and z/d dog food. These treats
                      are formulated to promote a urinary environment that
                      reduces the risk of developing struvite & calcium oxalate
                      crystals when fed with a compatible S+OXSHIELD food. How
                      it works:
                    </p>
                    <ul className="list-disc pl-8 pt-4">
                      <li className="text-lg">
                        Hydrolyzed protein to help manage adverse food reactions
                      </li>
                      <li className="text-lg">
                        Increased omega-3 and omega-6 fatty acids, including
                        EPA, help to nourish the skin and coat
                      </li>
                      <li className="text-lg">
                        Added antioxidants to help support skin barrier function
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-7">
                  <div id="header" className="flex justify-between">
                    <h1 className="font-medium text-2xl">
                      All Reviews{" "}
                      <span className="text-[16px] text-chinese-black opacity-50">
                        (451)
                      </span>
                    </h1>
                    <div className="flex gap-3 items-center">
                      <div className="p-4 rounded-full bg-anti-flash-white">
                        <img src={SortIcon} alt="sort" className="w-4 h-4" />
                      </div>
                      <div
                        className="flex items-center p-4 rounded-full
                       gap-3 bg-anti-flash-white"
                      >
                        <span className="text-[16px] font-medium">Latest</span>
                        <img
                          src={ChevronDownIcon}
                          alt="chevron-down"
                          className="w-3 h-3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-around flex-wrap gap-16 w-full">
                    {Array.from({ length: 6 }, (_, idx) => (
                      <ReviewCard key={idx} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
