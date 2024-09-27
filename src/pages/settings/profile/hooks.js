import { useCallback, useState } from "react";
import { useStore } from "../../../utils/store";
import { toast } from "sonner";
import axios from "axios";
import { API_URL } from "../../../utils/constants";

export default function useProfile() {
  const { user, setUser } = useStore();

  const [formData, setFormData] = useState({
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    dob: user.dob ?? "",
    gender: user.gender ?? "",
    address: {
      detail_address: user.address.detail_address ?? "",
      regency: user.address.regency ?? "",
      village: user.address.village ?? "",
    },
  });

  const handleChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );

  const handleGenderSelect = useCallback(
    (selectedGender) => {
      setFormData({ ...formData, gender: selectedGender });
    },
    [formData]
  );

  const handleChangeDetailAddress = useCallback(
    (e) => {
      setFormData({
        ...formData,
        address: { ...formData.address, detail_address: e.target.value },
      });
    },
    [formData]
  );

  const handleSelectRegency = useCallback(
    (selectedOption) => {
      setFormData({
        ...formData,
        address: { ...formData.address, regency: selectedOption },
      });
    },
    [formData]
  );

  const handleSelectVillage = useCallback(
    (selectedOption) => {
      setFormData({
        ...formData,
        address: { ...formData.address, village: selectedOption },
      });
    },
    [formData]
  );

  const onClickBtnSave = useCallback(() => {
    const data = {
      ...user,
      ...formData,
      username: `${formData.firstname} ${formData.lastname}`,
    };

    axios
      .put(`${API_URL}/users/${user.id}`, data)
      .then(() => {
        setUser(data);
        toast.success("Update Successfully!");
      })
      .catch((err) => {
        console.log("🚀 ~ onClickBtnSave ~ err:", err);
        toast.error("Something went wrong");
      });
  }, [formData, user]);

  return {
    state: { formData },
    method: {
      handleChange,
      handleGenderSelect,
      handleChangeDetailAddress,
      handleSelectRegency,
      handleSelectVillage,
      onClickBtnSave,
    },
  };
}
