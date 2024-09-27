import { useCallback, useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useStore } from "../../../utils/store";
import axios from "axios";
import { API_URL } from "../../../utils/constants";
import { generateRandomNumber } from "../../../utils/utils";

export default function useAddress() {
  const { user, setUser } = useStore();
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isOpenModalForm, setIsOpenModalForm] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [newAddress, setNewAddress] = useState({
    id: parseInt(generateRandomNumber()),
    label: "",
    name: "",
    phone_number: "",
    detail: "",
    is_primary: false,
  });

  useEffect(() => {
    if (user) {
      setAddress(user.shipping_address);
    }
  }, [user]);

  const handleFormNewAddress = useCallback(
    (e) => {
      setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    },
    [newAddress]
  );

  const handleChangeDetailAddress = useCallback(
    (e) => {
      setNewAddress({
        ...newAddress,
        detail: e.target.value,
      });
    },
    [newAddress]
  );

  const handleToggleModal = useCallback(() => {
    setIsOpenModalForm(!isOpenModalForm);
    setNewAddress({
      id: parseInt(generateRandomNumber()),
      label: "",
      name: "",
      phone_number: "",
      detail: "",
      is_primary: false,
    });
    setSelectedAddress(null);
  }, [isOpenModalForm]);

  const handleToggleModalDelete = useCallback(() => {
    setIsOpenModalDelete(!isOpenModalDelete);
  }, [isOpenModalDelete]);

  const handleSaveNewAddress = useCallback(() => {
    const isPrimary = Boolean(newAddress.is_primary);

    let formattedAddresses = user.shipping_address;

    if (isPrimary) {
      formattedAddresses = user.shipping_address.map((a) => ({
        ...a,
        is_primary: false,
      }));
    }

    const data = {
      ...user,
      shipping_address: [
        ...formattedAddresses,
        { ...newAddress, is_primary: isPrimary },
      ],
    };

    axios
      .put(`${API_URL}/users/${user.id}`, data)
      .then(() => {
        toast.success("Added new Address!");
        setIsOpenModalForm(false);
        setNewAddress({
          id: parseInt(generateRandomNumber()),
          label: "",
          name: "",
          phone_number: "",
          detail: "",
          is_primary: false,
        });
        setUser(data);
      })
      .catch((err) => {
        console.log("🚀 ~ axios.put ~ err:", err);
        toast.error("Something went wrong!");
      });
  }, [newAddress, user]);

  const onSetMainAddress = useCallback(
    (val) => {
      setSelectedAddress(val);

      const formattedAddresses = address.map((a) => ({
        ...a,
        is_primary: a.id === val.id ? true : false,
      }));

      const updatedUserData = {
        ...user,
        shipping_address: formattedAddresses,
      };

      axios
        .put(`${API_URL}/users/${user.id}`, updatedUserData)
        .then(() => {
          setUser(updatedUserData);
          toast.success("Updated New Main Address");
        })
        .catch((err) => {
          console.log("🚀 ~ .then ~ err:", err);
          toast.error("Something went wrong");
        });
    },
    [user, address]
  );

  const handleOnDeleteAddress = useCallback((val) => {
    setSelectedAddress(val);

    if (val.is_primary) {
      toast.error("Delete Main Address is not allowed!");
    } else {
      setIsOpenModalDelete(true);
    }
  }, []);

  const handleConfirmDeleteAddress = useCallback(() => {
    const filteredAddress = user.shipping_address.filter(
      (a) => a.id != selectedAddress.id
    );

    const data = {
      ...user,
      shipping_address: filteredAddress,
    };

    axios
      .put(`${API_URL}/users/${user.id}`, data)
      .then(() => {
        setUser(data);
        toast.success("Success Delete Address!");
        setIsOpenModalDelete(false);
        setSelectedAddress(null);
      })
      .catch((err) => {
        console.log("🚀 ~ .then ~ err:", err);
        toast.error("Something went wrong");
      });
  }, [user, selectedAddress]);

  const handleEditAddress = useCallback((val) => {
    setSelectedAddress(val);
    setNewAddress({
      id: val.id,
      label: val.label,
      name: val.name,
      phone_number: val.phone_number,
      detail: val.detail,
      is_primary: val.is_primary,
    });
    setIsOpenModalForm(true);
  }, []);

  const handleUpdateAddress = useCallback(() => {
    const isPrimary = Boolean(newAddress.is_primary);

    let formattedAddresses = user.shipping_address.filter(
      (a) => a.id != selectedAddress.id
    );

    if (isPrimary) {
      formattedAddresses = formattedAddresses.map((a) => ({
        ...a,
        is_primary: false,
      }));
    }

    const data = {
      ...user,
      shipping_address: [
        ...formattedAddresses,
        { ...newAddress, is_primary: isPrimary },
      ],
    };

    axios
      .put(`${API_URL}/users/${user.id}`, data)
      .then(() => {
        toast.success("Address Updated!");
        setIsOpenModalForm(false);
        setNewAddress({
          id: parseInt(generateRandomNumber()),
          label: "",
          name: "",
          phone_number: "",
          detail: "",
          is_primary: false,
        });
        setUser(data);
      })
      .catch((err) => {
        console.log("🚀 ~ axios.put ~ err:", err);
        toast.error("Something went wrong!");
      });
  }, [user, selectedAddress, newAddress]);

  return {
    state: {
      isOpenModalForm,
      newAddress,
      address,
      selectedAddress,
      isOpenModalDelete,
    },
    method: {
      handleToggleModal,
      handleFormNewAddress,
      handleChangeDetailAddress,
      handleSaveNewAddress,
      onSetMainAddress,
      handleToggleModalDelete,
      handleOnDeleteAddress,
      handleConfirmDeleteAddress,
      handleEditAddress,
      handleUpdateAddress,
    },
  };
}
