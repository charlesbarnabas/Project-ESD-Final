import { getCurrentDateFormatted, priceFormatter } from "../../utils/utils";
import { useCart } from "./hooks";
import CartCard from "../../components/cart-card";
import Breadcrumb from "../../components/breadcrumb";
import { Link } from "react-router-dom";

export default function Cart() {
  const { state, method } = useCart();

  return (
    <div id="cart" className="flex flex-col gap-16 pt-40 px-20">
      <Breadcrumb page="Cart" />

      <div className="w-full h-full flex justify-center items-start gap-24 pb-32">
        <div id="cart-items" className="flex flex-col gap-6 min-w-[900px]">
          <h1 className="font-semibold text-[28px] border-b border-b-gainsboro">
            Cart
          </h1>
          <div className="flex flex-col gap-6">
            {state.carts.length > 0 ? (
              state.carts.map((cart, idx) => (
                <div key={idx} className="border-b border-b-gainsboro py-6">
                  <CartCard product={cart} refetch={method.fetchCarts} />
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <h1 className="font-semibold text-2xl">
                  Oops! Your Cart is Empty.{" "}
                </h1>
                <h3 className="text-lg">
                  Let&apos;s add some products to your Cart!
                </h3>
              </div>
            )}
          </div>
        </div>
        <div
          id="summary"
          className="rounded-md min-w-[400px] p-[30px] border border-gainsboro shadow-md "
        >
          {!state.isConfirm ? (
            <div className="flex flex-col gap-6">
              <h4 className="font-semibold text-[16px]">Order Summary</h4>
              <div className="flex flex-col gap-6 py-6 border-y border-y-gainsboro">
                <div className="flex justify-between gap-6">
                  <h4 className="font-medium text-[16px]">Price</h4>
                  <h4 className="font-medium text-[16px]">
                    {priceFormatter(state.totalPrice)}
                  </h4>
                </div>
                <div className="flex justify-between gap-6">
                  <h4 className="font-medium text-[16px]">Discount</h4>
                  <h4 className="font-medium text-[16px]">
                    {priceFormatter(state.totalDiscount)}
                  </h4>
                </div>
                <div className="flex justify-between gap-6">
                  <h4 className="font-medium text-[16px]">Shipping</h4>
                  <h4 className="font-medium text-[16px] text-chinese-black opacity-50">
                    Free
                  </h4>
                </div>
                <div className="flex justify-between gap-6">
                  <h4 className="font-medium text-[16px]">Coupon Applied</h4>
                  <h4 className="font-medium text-[16px]">
                    {priceFormatter(0)}
                  </h4>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between gap-6">
                  <h4 className="font-semibold text-[16px]">Total:</h4>
                  <h4 className="font-medium text-xl text-spiro-disco-ball">
                    {priceFormatter(state.totalPrice - state.totalDiscount)}
                  </h4>
                </div>
                <div className="flex justify-between gap-6">
                  <h4 className="font-medium text-[16px]">
                    Estimated Delivery by
                  </h4>
                  <h4 className="font-medium text-[16px]">
                    {state.carts.length > 0 ? getCurrentDateFormatted() : "-"}
                  </h4>
                </div>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="text-chinese-black opacity-50 py-4 px-6 w-full border border-gainsboro rounded-md"
                />
                <button
                  onClick={() => method.onClickBtnConfirm()}
                  className={`border bg-spiro-disco-ball text-white font-semibold text-sm p-4 rounded-md ${
                    state.carts.length > 0
                      ? "hover:text-spiro-disco-ball hover:bg-white hover:border-spiro-disco-ball  ease-in-out duration-500"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={state.carts.length == 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-[16px]">Shipping Address</h4>
                <Link
                  to="/settings/address"
                  className="font-medium text-chinese-black opacity-50 text-xs"
                >
                  Select Other Address
                </Link>
              </div>
              <div className="flex flex-col gap-6 py-6 border-y border-y-gainsboro">
                {/* hardcode for now */}
                {state.selectedAddress ? (
                  <div className="flex flex-col gap-1 bg-[#e1f7ff] py-2 px-6 rounded-lg">
                    <h5 className="text-xs font-medium">
                      {state.selectedAddress.name}{" "}
                      <span className="font-normal">
                        ({state.selectedAddress.label})
                      </span>
                    </h5>
                    <h5 className="text-xs font-medium text-chinese-black opacity-50">
                      {state.selectedAddress.phone_number}
                    </h5>
                    <p className="max-w-[250px] text-xs">
                      {state.selectedAddress.detail}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h1 className="font-medium text-sm text-center">
                      Please add primary address.
                    </h1>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between gap-6">
                  <h4 className="font-semibold text-[16px]">Total:</h4>
                  <h4 className="font-medium text-xl text-spiro-disco-ball">
                    {priceFormatter(state.totalPrice - state.totalDiscount)}
                  </h4>
                </div>
                <button
                  onClick={() => method.onClickBtnConfirm()}
                  className={`border font-semibold text-sm p-4 rounded-md ease-in-out duration-500 bg-spiro-disco-ball text-white ${state.selectedAddress ? 'hover:text-spiro-disco-ball hover:bg-white hover:border-spiro-disco-ball' : 'opacity-50'}`}
                  disabled={!state.selectedAddress}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
