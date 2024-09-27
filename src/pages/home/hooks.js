import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";

export function useHome() {
  const [categories, setCategories] = useState([]);
  const [flashSales, setFlashsales] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [topBrands, setTopBrands] = useState([]);

  const fetchCategories = useCallback(() => {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.log("🚀 ~ useEffect ~ err:", err);
      });
  }, []);

  const fetchFlashSale = useCallback(() => {
    axios
      .get(`${API_URL}/flashsales`)
      .then((res) => setFlashsales(res.data))
      .catch((err) => {
        console.log("🚀 ~ useEffect ~ err:", err);
      });
  }, []);

  const fetchNewItems = useCallback(() => {
    axios
      .get(`${API_URL}/new-items`)
      .then((res) => setNewItems(res.data))
      .catch((err) => {
        console.log("🚀 ~ useEffect ~ err:", err);
      });
  }, []);

  const fetchPopularItems = useCallback(() => {
    axios
      .get(`${API_URL}/popular-items`)
      .then((res) => setPopularItems(res.data))
      .catch((err) => {
        console.log("🚀 ~ useEffect ~ err:", err);
      });
  }, []);

  const fetchTopBrands = useCallback(() => {
    axios
      .get(`${API_URL}/top-brands`)
      .then((res) => setTopBrands(res.data))
      .catch((err) => {
        console.log("🚀 ~ useEffect ~ err:", err);
      });
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchFlashSale();
    fetchNewItems();
    fetchPopularItems();
    fetchTopBrands();
  }, [
    fetchFlashSale,
    fetchCategories,
    fetchNewItems,
    fetchPopularItems,
    fetchTopBrands,
  ]);

  return {
    state: { categories, flashSales, newItems, popularItems, topBrands },
  };
}
