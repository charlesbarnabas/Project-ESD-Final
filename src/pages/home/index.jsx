import HomeBanner from "../../assets/banner.png";
import ArrowLeftIcon from "../../assets/arrow-left.png";
import ArrowRightIcon from "../../assets/arrow-right.png";
import AdsGrooming from "../../assets/ads-1.png";
import AdsPetShop from "../../assets/ads-2.png";
import BottomBanner from "../../assets/bottom-banner.png";
import CategoriesCard from "../../components/categories-card";
import { useHome } from "./hooks";
import ProductCard from "../../components/product-card";
import TopBrandCard from "../../components/top-brand-card";

export default function Home() {
  const { state } = useHome();

  return (
    <div className="w-full h-full flex flex-col bg-cultured items-center pt-28">
      <div
        id="body"
        className="flex flex-col items-center gap-16 h-full bg-white w-full px-56 py-4"
      >
        <div id="banner">
          <img
            src={HomeBanner}
            alt="home-banner"
            className="w-[1440px] h-[620px] rounded-md"
          />
        </div>

        <div id="top-categories" className="flex flex-col gap-10 w-full">
          <div id="header" className="flex justify-between">
            <h1 className="font-medium text-3xl">
              Top <span className="font-bold">Categories</span>
            </h1>
            <div className="flex justify-center gap-2">
              <div className="rounded-full p-3 cursor-pointer bg-cultured">
                <img src={ArrowLeftIcon} alt="arrow-left" />
              </div>
              <div className="rounded-full p-3 cursor-pointer bg-cultured">
                <img src={ArrowRightIcon} alt="arrow-right" />
              </div>
            </div>
          </div>
          <div className="flex justify-around gap-5">
            {state.categories.map((category, idx) => (
              <CategoriesCard
                key={idx}
                img={category.image}
                alt={category.alt}
                label={category.label}
              />
            ))}
          </div>
        </div>

        <div id="flash-sale" className="flex flex-col gap-10 w-full">
          <div id="header" className="flex justify-between">
            <h1 className="font-medium text-3xl">
              Flash <span className="font-bold">Sales</span>
            </h1>
            <h4 className="font-medium text-[16px]">View Detail</h4>
          </div>
          <div className="flex justify-around gap-8">
            {state.flashSales.map((flashSale, idx) => (
              <ProductCard
                key={idx}
                image={flashSale.image}
                alt={flashSale.alt}
                name={flashSale.name}
                price={flashSale.price}
                review={flashSale.review}
                discount={flashSale.discount}
                isFlashsale={true}
              />
            ))}
          </div>
        </div>

        <div id="new-items" className="flex flex-col gap-10 w-full">
          <div id="header" className="flex justify-between">
            <h1 className="font-medium text-3xl">
              New <span className="font-bold">Items</span>
            </h1>
            <h4 className="font-medium text-[16px]">View Detail</h4>
          </div>
          <div className="flex justify-around gap-8">
            {state.newItems.map((newItem, idx) => (
              <ProductCard
                key={idx}
                image={newItem.image}
                alt={newItem.alt}
                name={newItem.name}
                price={newItem.price}
                review={newItem.review}
                isFlashsale={false}
              />
            ))}
          </div>
        </div>

        <div id="popular-items" className="flex flex-col gap-10 w-full">
          <div id="header" className="flex justify-between">
            <h1 className="font-medium text-3xl">
              Popular <span className="font-bold">Items</span>
            </h1>
            <h4 className="font-medium text-[16px]">View Detail</h4>
          </div>
          <div className="flex justify-around gap-8">
            {state.popularItems.map((popularItem, idx) => (
              <ProductCard
                key={idx}
                image={popularItem.image}
                alt={popularItem.alt}
                name={popularItem.name}
                price={popularItem.price}
                review={popularItem.review}
                isFlashsale={false}
              />
            ))}
          </div>
        </div>

        <div id="ads" className="flex justify-between gap-8 w-full max-w-[1322px]">
          <img src={AdsGrooming} alt="ads-grooming-service" />
          <img src={AdsPetShop} alt="ads-pet-shop" />
        </div>

        <div id="top-brands" className="flex flex-col gap-10 w-full">
          <div id="header" className="flex justify-between">
            <h1 className="font-medium text-3xl">
              Top <span className="font-bold">Brands</span>
            </h1>
            <div className="flex justify-center gap-2">
              <div className="rounded-full p-3 cursor-pointer bg-cultured">
                <img src={ArrowLeftIcon} alt="arrow-left" />
              </div>
              <div className="rounded-full p-3 cursor-pointer bg-cultured">
                <img src={ArrowRightIcon} alt="arrow-right" />
              </div>
            </div>
          </div>
          <div className="flex justify-around gap-6">
            {state.topBrands.map((brand, idx) => (
              <TopBrandCard key={idx} img={brand.image} alt={brand.alt} />
            ))}
          </div>
        </div>

        <div id="bottom-banner">
          <img
            src={BottomBanner}
            alt="bottom-banner"
            className="w-[1322px] h-[445px] rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
