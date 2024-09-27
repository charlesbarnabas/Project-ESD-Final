import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { API_URL } from "../../../utils/constants";
import { useStore } from "../../../utils/store";
import { useNavigate } from "react-router-dom";
import { extractFirstAndLastName } from "../../../utils/utils";

export function useAuthSignup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);
  const [isError, setIsError] = useState(false);
  const { setUser } = useStore();
  const navigate = useNavigate();

  const onChangeUsername = useCallback((value) => {
    setUserName(value);
  }, []);

  const onChangeEmail = useCallback((value) => {
    setEmail(value);
  }, []);

  const onChangePassword = useCallback((value) => {
    setPassword(value);
  }, []);

  const onClickBtnRegister = useCallback(() => {
    setUser({});

    if (username.length < 3) {
      toast.error("Username can't be less than 3 character");
      setIsError(true);
      return;
    }

    if (password.length < 8) {
      toast.error("Password can't be less than 8 character");
      setIsError(true);
      return;
    }

    axios
      .get(`${API_URL}/users?email=${email}`)
      .then((res) => {
        if (!res.data[0]) {
          const { firstName, lastName } = extractFirstAndLastName(username);

          const data = {
            username,
            email,
            password,
            firstname: firstName,
            lastname: lastName,
            dob: "",
            created_date: Date.now(),
            address: {},
            shipping_address: [],
          };

          axios
            .post(`${API_URL}/users`, data)
            .then((res) => {
              setUser(res.data);
              toast.success("Success to Register!");
              navigate("/");
            })
            .catch((err) => {
              console.log("🚀 ~ onClickBtnRegister ~ err:", err);
              toast.error("Failed to Register");
            });
        } else {
          setIsError(true);
          toast.error("User Already Exist!");
        }
      })
      .catch((err) => {
        console.log("🚀 ~ onClickBtnRegister ~ err:", err);
      });
  }, [email, password, username, setUser]);

  useEffect(() => {
    setDisableBtn(username == "" || email == "" || password == "");
  }, [username, email, password]);

  return {
    state: { email, password, disableBtn, isError },
    method: {
      onClickBtnRegister,
      onChangeEmail,
      onChangePassword,
      onChangeUsername,
    },
  };
}
