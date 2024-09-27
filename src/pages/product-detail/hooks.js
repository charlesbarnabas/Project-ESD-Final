import axios from "axios";
import { useCallback, useState } from "react";
import { API_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../utils/store";
import { toast } from "sonner";

export function useProductDetail() {
  const [product, setProduct] = useState(null);
  const [amount, setAmount] = useState(1);
  const [activeSection, setActiveSection] = useState(1);
  const [onWishlist, setOnWishlist] = useState(false);

  const navigate = useNavigate();
  const { user } = useStore();

  const fetchProduct = useCallback((productName) => {
    axios
      .get(`${API_URL}/products?name_like=${productName.replaceAll("_", " ")}`)
      .then((res) => setProduct(res.data[0]))
      .catch((err) => {
        console.error("🚀 ~ useProductDetail ~ err:", err);
        toast.error("Fail to find product");
      });
  }, []);

  const fetchWishlist = useCallback(
    (product) => {
      if (user) {
        axios
          .get(`${API_URL}/wishlist?id=${product.id}&user_id=${user.id}`)
          .then((res) => {
            setOnWishlist(!!res.data[0]);
          })
          .catch((err) => {
            console.error("🚀 ~ fetchWishlist ~ err:", err);
            toast.error("Fail to find product");
          });
      }
    },
    [product, user]
  );

  const addToCart = useCallback(() => {
    if (!user) {
      navigate("/auth/signin");
      return;
    }

    const data = {
      ...product,
      user_id: user.id,
      amount,
    };

    axios
      .get(`${API_URL}/carts?name=${product.name}&user_id=${user.id}`)
      .then((res) => {
        if (res.data[0]) {
          axios
            .put(`${API_URL}/carts/${product.id}`, data)
            .then(() => {
              toast.success("Success add product to Cart!");
            })
            .catch((err) => {
              console.error("🚀 ~ addToCart ~ err:", err);
              toast.error("Fail add product to Cart");
            });
        } else {
          axios
            .post(`${API_URL}/carts`, data)
            .then(() => {
              toast.success("Success add product to Cart!");
            })
            .catch((err) => {
              console.error("🚀 ~ addToCart ~ err:", err);
              toast.error("Fail add product to Cart");
            });
        }
      })
      .catch((err) => {
        console.error("🚀 ~ addToCart ~ err:", err);
      });
  }, [amount, product, user]);

  const changeAmount = useCallback((newAmount) => {
    setAmount(newAmount);
  }, []);

  const changeActiveSection = useCallback((val) => setActiveSection(val), []);

  const toggleToWishlist = useCallback(
    (val) => {
      if (!user) {
        navigate("/auth/signin");
        return;
      }

      setOnWishlist(val);

      if (onWishlist) {
        axios
          .delete(`${API_URL}/wishlist/${product.id}`)
          .then(() => {
            toast.success("Success remove product from Wishlist!");
          })
          .catch((err) => {
            console.error("🚀 ~ toggleToWishlist ~ err:", err);
            toast.error("Fail to remove product from Wishlist!");
          });
      } else {
        const data = { ...product, user_id: user.id };
        axios
          .post(`${API_URL}/wishlist`, data)
          .then(() => {
            toast.success("Added to Wishlist!");
          })
          .catch((err) => {
            console.error("🚀 ~ toggleToWishlist ~ err:", err);
            toast.error("Fail add product to Wishlist");
          });
      }
    },
    [onWishlist, product]
  );

  return {
    state: { product, amount, activeSection, onWishlist, user },
    method: {
      fetchProduct,
      fetchWishlist,
      changeAmount,
      changeActiveSection,
      addToCart,
      toggleToWishlist,
    },
  };
}
