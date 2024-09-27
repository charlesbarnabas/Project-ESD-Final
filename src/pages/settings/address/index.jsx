import AddressCard from "../../../components/address-card";
import InputField from "../../../components/InputField";
import Modal from "../../../components/modal";
import TextareaField from "../../../components/TextareaField";
import useAddress from "./hooks";

export default function Address() {
  const { state, method } = useAddress();

  return (
    <div id="profile" className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-[28px]">Address List</h1>
        <button
          onClick={() => method.handleToggleModal()}
          className="text-white bg-spiro-disco-ball border py-5 px-16 rounded-lg hover:text-spiro-disco-ball hover:bg-white hover:border hover:border-spiro-disco-ball font-bold text-sm ease-in-out duration-500"
        >
          Add New Address
        </button>
      </div>

      <div className="flex flex-col gap-6 border border-gainsboro py-8 px-6 rounded-lg shadow-sm">
        {state.address.length > 0 ? (
          state.address.map((a, idx) => (
            <AddressCard
              key={idx}
              label={a.label}
              detail={a.detail}
              is_primary={a.is_primary}
              name={a.name}
              phone_number={a.phone_number}
              onSetAsPrimary={() => method.onSetMainAddress(a)}
              onDeleteAddress={() => method.handleOnDeleteAddress(a)}
              onEditAddress={() => method.handleEditAddress(a)}
            />
          ))
        ) : (
          <h3 className="font-medium text-xl">
            You don&apos;t have an address yet
          </h3>
        )}
      </div>

      {/* modal form address */}
      <Modal
        isOpen={state.isOpenModalForm}
        onClose={() => method.handleToggleModal()}
      >
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-lg font-medium pb-4 border-b">
            {state.selectedAddress ? "Edit Address" : "Add New Address"}
          </h2>
          <div className="flex flex-col gap-2 w-full bg-white p-6 rounded-lg">
            <InputField
              label="Label"
              name="label"
              value={state.newAddress.label}
              onChange={method.handleFormNewAddress}
              type="text"
            />
            <InputField
              label="Name"
              name="name"
              value={state.newAddress.name}
              onChange={method.handleFormNewAddress}
              type="text"
            />
            <InputField
              label="Phone Number"
              name="phone_number"
              value={state.newAddress.phone_number}
              onChange={method.handleFormNewAddress}
              type="text"
            />
            <TextareaField
              label="Detail Address"
              name="detail"
              value={state.newAddress.detail}
              onChange={method.handleChangeDetailAddress}
            />
            <div className="flex items-center">
              <label className="block w-[150px] text-sm font-medium">
                Use as Main Address
              </label>
              <input
                type="checkbox"
                name="is_primary"
                checked={state.newAddress.is_primary}
                onChange={(e) => method.handleFormNewAddress(e)}
                className="block p-5 border border-gainsboro rounded-md focus:ring-spiro-disco-ball focus:border-spiro-disco-ball outline-none"
              />
            </div>
          </div>
          <button
            onClick={() =>
              state.selectedAddress
                ? method.handleUpdateAddress()
                : method.handleSaveNewAddress()
            }
            className="self-end text-white bg-spiro-disco-ball border py-5 px-16 rounded-lg hover:text-spiro-disco-ball hover:bg-white hover:border hover:border-spiro-disco-ball font-bold text-sm ease-in-out duration-500"
          >
            Save
          </button>
        </div>
      </Modal>

      {/* modal delete */}
      <Modal
        isOpen={state.isOpenModalDelete}
        onClose={() => method.handleToggleModalDelete()}
        width="w-1/4"
      >
        <div className="flex flex-col gap-6">
          <h4 className="font-semibold text-lg">
            Are you sure delete this Address?
          </h4>
          <div className="flex gap-2 justify-between">
            <button
              onClick={() => method.handleToggleModalDelete()}
              className="w-1/2 hover:text-white hover:bg-spiro-disco-ball border p-2 rounded-lg text-spiro-disco-ball bg-white hover:border border-spiro-disco-ball font-bold text-sm ease-in-out duration-500"
            >
              Cancel
            </button>
            <button
              onClick={() => method.handleConfirmDeleteAddress()}
              className="w-1/2 hover:text-white hover:bg-orange-soda border p-2 rounded-lg text-orange-soda bg-white hover:border border-orange-soda font-bold text-sm ease-in-out duration-500"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
