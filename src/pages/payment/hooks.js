import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useStore } from "../../utils/store";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export function usePayment() {
  const [transaction, setTransaction] = useState(null);
  const { user } = useStore();

  const fetchTransaction = useCallback(() => {
    axios
      .get(`${API_URL}/transactions?user_id=${user.id}`)
      .then((res) => {
        setTransaction(res.data.pop());
      })
      .catch((err) => {
        console.log("🚀 ~ .then ~ err:", err);
        toast.error("Something went wrong");
      });
  }, [user]);

  const onClickButtonGenerate = useCallback(() => {
    toast.warning("This feature isn't available yet.");
  }, []);

  useEffect(() => {
    fetchTransaction();
  }, []);

  return {
    state: { transaction },
    method: { onClickButtonGenerate },
  };
}
