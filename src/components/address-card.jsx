import PropTypes from "prop-types";
import EditIcon from "../assets/edit.png";
import DeleteIcon from "../assets/delete.png";

export default function AddressCard({
  label,
  name,
  phone_number,
  detail,
  is_primary,
  onEditAddress,
  onDeleteAddress,
  onSetAsPrimary,
}) {
  return (
    <div
      className={`w-full border p-4 rounded-lg shadow-md flex items-center justify-between ${
        is_primary ? "border-spiro-disco-ball" : "border-gainsboro"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <h1 className="font-semibold text-xl">{label}</h1>
          {is_primary && (
            <span className="px-2 py-1 text-xs text-spiro-disco-ball bg-[#E1F7FF] rounded-lg">
              Main Address
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-lg">{name}</h3>
          <h3 className="text-sm">{phone_number}</h3>
          <p className="text-sm">{detail}</p>
        </div>

        <div className="flex items-center gap-4">
          <div
            onClick={onEditAddress}
            className="flex gap-2 cursor-pointer items-center"
          >
            <img src={EditIcon} alt="edit" />
            <h4 className="font-medium text-spiro-disco-ball text-sm">
              Edit Address
            </h4>
          </div>
          <span> | </span>
          <div
            onClick={onDeleteAddress}
            className="flex gap-2 cursor-pointer items-center"
          >
            <img src={DeleteIcon} alt="delete" />
            <h4 className="font-medium text-spiro-disco-ball text-sm">
              Delete Address
            </h4>
          </div>
        </div>
      </div>
      {!is_primary && (
        <button
          onClick={onSetAsPrimary}
          className="h-10 hover:text-white hover:bg-spiro-disco-ball border p-2 rounded-lg text-spiro-disco-ball bg-white hover:border border-spiro-disco-ball font-bold text-sm ease-in-out duration-500"
        >
          Use as Main Address
        </button>
      )}
    </div>
  );
}

AddressCard.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone_number: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  is_primary: PropTypes.bool.isRequired,
  onEditAddress: PropTypes.func.isRequired,
  onDeleteAddress: PropTypes.func.isRequired,
  onSetAsPrimary: PropTypes.func.isRequired,
};
