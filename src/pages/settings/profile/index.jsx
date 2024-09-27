import { toast } from "sonner";
import AvatarIcon from "../../../assets/avatar.png";
import useProfile from "./hooks";
import InputField from "../../../components/InputField";
import GenderSelection from "../../../components/GenderField";
import TextareaField from "../../../components/TextareaField";
import Dropdown from "../../../components/DropdownField";

export default function Profile() {
  const { state, method } = useProfile();

  return (
    <div id="profile" className="flex flex-col gap-6">
      <h1 className="font-bold text-[28px]">Profile</h1>
      <div className="flex flex-col gap-14 border rounded-lg py-8 px-16">
        <div id="basic-information" className="flex gap-7">
          <div className="flex flex-col gap-5 w-3/4">
            <div className="w-full border-b border-gainsboro py-3">
              <h3 className="font-semibold text-[16px]">Basic Information</h3>
            </div>
            <div className="flex flex-col gap-2 w-full bg-white p-6 rounded-lg">
              <InputField
                label="Email"
                name="email"
                value={state.formData.email}
                onChange={method.handleChange}
                type="email"
              />
              <InputField
                label="First name"
                name="firstname"
                value={state.formData.firstname}
                onChange={method.handleChange}
                type="text"
              />
              <InputField
                label="Last name"
                name="lastname"
                value={state.formData.lastname}
                onChange={method.handleChange}
                type="text"
              />
              <InputField
                label="Date of Birth"
                name="dob"
                value={state.formData.dob}
                onChange={method.handleChange}
                type="text"
              />
              <div className="flex items-center">
                <label className="w-[150px] block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <GenderSelection
                  gender={state.formData.gender}
                  onSelectGender={method.handleGenderSelect}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col p-4 gap-4 w-1/4 border border-gainsboro shadow-md rounded-lg items-center h-full">
            <img
              src={AvatarIcon}
              alt="avatar-icon"
              className="w-[200px] h-[200px]"
            />
            <button
              className="w-full font-semibold text-chinese-black opacity-50 text-xs py-4 px-14 border border-gainsboro rounded-md"
              onClick={() => toast.warning("This feature isn't available yet.")}
            >
              Change Photo
            </button>
            <p className="text-chinese-black opacity-50 text-xs">
              Please limit image file sizes 5 MB and to the following image
              formats: jpeg, jpg,and png..
            </p>
          </div>
        </div>
        <div id="address" className="flex flex-col gap-7">
          <div className="w-full border-b border-gainsboro py-3">
            <h3 className="font-semibold text-[16px]">Address</h3>
          </div>
          <div className="flex flex-col gap-2 w-full bg-white p-6 rounded-lg">
            <TextareaField
              label="Detail Address"
              name="address"
              value={state.formData.address.detail_address}
              onChange={method.handleChangeDetailAddress}
            />
            <Dropdown
              label="Regency / City"
              options={["DKI Jakarta", "Bandung", "Bekasi", "Depok", "Bogor"]}
              selectedValue={state.formData.address.regency}
              onChange={method.handleSelectRegency}
            />
            <Dropdown
              label="Village"
              options={["DKI Jakarta", "Bandung", "Bekasi", "Depok", "Bogor"]}
              selectedValue={state.formData.address.village}
              onChange={method.handleSelectVillage}
            />
          </div>
        </div>
        <button
          onClick={() => method.onClickBtnSave()}
          className="self-end text-white bg-spiro-disco-ball border py-5 px-16 rounded-lg hover:text-spiro-disco-ball hover:bg-white hover:border hover:border-spiro-disco-ball font-bold text-sm ease-in-out duration-500"
        >
          Save
        </button>
      </div>
    </div>
  );
}
