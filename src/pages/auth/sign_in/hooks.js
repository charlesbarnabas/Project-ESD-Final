import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { API_URL } from "../../../utils/constants";
import { useStore } from "../../../utils/store";
import { useNavigate } from "react-router-dom";

export function useAuthSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);
  const [isError, setIsError] = useState(false);
  const { setUser } = useStore();
  const navigate = useNavigate();

  const onChangeEmail = useCallback((value) => {
    setEmail(value);
  }, []);

  const onChangePassword = useCallback((value) => {
    setPassword(value);
  }, []);

  const onClickBtnLogin = useCallback(() => {
    axios
      .get(`${API_URL}/users?email=${email}`)
      .then((res) => {
        if (res.data[0]) {
          setUser(res.data[0]);
          toast.success("Success!");
          navigate("/");
        } else {
          setIsError(true);
          toast.error("Email / Password is wrong!");
        }
      })
      .catch((err) => {
        console.log("🚀 ~ onClickBtnLogin ~ err:", err);
        setIsError(true);
        toast.error("Email / Password is wrong!");
      });
  }, [email, setUser]);

  useEffect(() => {
    setDisableBtn(email == "" || password == "");
  }, [email, password]);

  return {
    state: { email, password, disableBtn, isError },
    method: { onClickBtnLogin, onChangeEmail, onChangePassword },
  };
}
