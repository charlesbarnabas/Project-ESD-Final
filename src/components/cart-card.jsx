import PropTypes from "prop-types";
import { imageSource, priceFormatter } from "../utils/utils";
import { useCallback, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { toast } from "sonner";

export default function CartCard({ product, refetch }) {
  const { id, user_id, image, name, price, discount } = product;

  const [amount, setAmount] = useState(product.amount);

  const changeAmount = useCallback(
    (newAmount) => {
      const data = {
        ...product,
        amount: newAmount,
      };

      // This logic is very costly LOL :D
      axios
        .put(`${API_URL}/carts/${id}?user_id=${user_id}`, data)
        .then((res) => {
          setAmount(res.data.amount);
          refetch();
        })
        .catch((err) => {
          console.error("🚀 ~ changeAmount ~ err:", err);
          toast.error("Fail update product Cart");
        });
    },
    [id, product, user_id]
  );

  const onDeleteProduct = useCallback(() => {
    axios
      .delete(`${API_URL}/carts/${id}?user_id=${user_id}`)
      .then(() => {
        refetch();
        toast.success("Success remove product from Cart");
      })
      .catch((err) => {
        console.error("🚀 ~ onDeleteProduct ~ err:", err);
        toast.error("Fail remove product from Cart");
      });
  });

  return (
    <div id="item-cart" className="flex justify-between gap-6 items-start">
      <img
        src={imageSource(image)}
        alt="cart-image"
        className="w-32 h-32 rounded-md"
      />
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <h3 className="font-semibold text-xl">{name}</h3>
            <div className="flex gap-6">
              <h5 className="font-medium text-[16px] text-chinese-black opacity-50">
                {priceFormatter(price)}
              </h5>
              {discount && (
                <h5 className="font-medium text-[16px] text-chinese-black opacity-50 line-through">
                  ({priceFormatter(discount)})
                </h5>
              )}
            </div>
          </div>
          <div>
            <button
              onClick={() => onDeleteProduct()}
              className="font-medium text-sm text-chinese-black opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
        <div id="counter" className="flex items-center gap-4">
          <button
            className={`text-white rounded-md w-8 h-8 font-medium ${
              amount > 1 ? "bg-spiro-disco-ball" : "bg-gainsboro"
            }`}
            disabled={amount == 1}
            onClick={() => changeAmount(amount - 1)}
          >
            -
          </button>
          <span className="font-semibold text-[16px] w-3 text-center">
            {amount}
          </span>
          <button
            className="text-white bg-spiro-disco-ball rounded-md w-8 h-8 font-medium"
            onClick={() => changeAmount(amount + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

CartCard.propTypes = {
  product: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};
