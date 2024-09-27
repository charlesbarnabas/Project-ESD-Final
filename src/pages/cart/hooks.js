import { useCallback, useEffect, useState } from "react";
import { useStore } from "../../utils/store";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  generateRandomNumber,
  getCurrentDateFormatted,
  getCurrentTimeFormatted,
} from "../../utils/utils";

export function useCart() {
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [isConfirm, setIsConfirm] = useState(false);
  const [selectedAddress, setSelectedAddres] = useState(null);
  const { user } = useStore();
  const navigate = useNavigate();

  const fetchCarts = useCallback(() => {
    if (user) {
      axios
        .get(`${API_URL}/carts?user_id=${user.id}`)
        .then((res) => {
          setCarts(res.data);
        })
        .catch((err) => {
          console.log("🚀 ~ fetchCarts ~ err:", err);
          toast.error("Fail to fetch data cart");
        });

      if (user.shipping_address.length > 0) {
        const primaryAddress = user.shipping_address.find((a) => a.is_primary);
        setSelectedAddres(primaryAddress);
      }
    }
  }, [user]);

  const onClickBtnConfirm = useCallback(() => {
    if (!isConfirm) {
      setIsConfirm(true);
      return;
    } else {
      const transaction = {
        total_price: totalPrice - totalDiscount,
        date: getCurrentDateFormatted(),
        time: getCurrentTimeFormatted(),
        ref_number: generateRandomNumber(),
        user_id: user.id,
      };

      axios.post(`${API_URL}/transactions`, transaction).then(() => {
        carts.forEach((c) => {
          axios
            .delete(`${API_URL}/carts/${c.id}?user_id=${user.id}`)
            .then(() => {
              navigate("/payment");
            })
            .catch((err) => {
              console.log("🚀 ~ carts.forEach ~ err:", err);
              toast.error("Something went wrong");
            });
        });
      });
    }
  }, [isConfirm, carts]);

  useEffect(() => {
    fetchCarts();
  }, []);

  useEffect(() => {
    if (carts && carts.length > 0) {
      const { totalPrice, totalDiscount } = carts.reduce(
        (accumulator, item) => {
          const itemPrice = item.price * item.amount;
          // Use 0 as default value if `item.discount` is undefined or missing
          const itemDiscount = !item.discount
            ? 0
            : (item.discount - item.price) * item.amount;

          return {
            totalPrice: accumulator.totalPrice + itemPrice,
            totalDiscount: accumulator.totalDiscount + itemDiscount,
          };
        },
        { totalPrice: 0, totalDiscount: 0 }
      );

      setTotalPrice(totalPrice);
      setTotalDiscount(totalDiscount);
    }
  }, [carts]);

  return {
    state: {
      carts,
      totalPrice,
      totalDiscount,
      isConfirm,
      user,
      selectedAddress,
    },
    method: { fetchCarts, onClickBtnConfirm },
  };
}
