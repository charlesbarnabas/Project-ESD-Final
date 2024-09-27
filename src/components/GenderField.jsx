import PropTypes from "prop-types";

export default function GenderSelection({ gender, onSelectGender }) {
  return (
    <div className="flex gap-4 w-3/4">
      <button
        type="button"
        className={`flex-1 border py-5 px-20 rounded-md ${
          gender === "Male"
            ? "border-spiro-disco-ball bg-[#E1F7FF] text-chinese-black"
            : "border-gray-300 text-gray-500"
        }`}
        onClick={() => onSelectGender("Male")}
      >
        Male
      </button>
      <button
        type="button"
        className={`flex-1 border py-5 px-20 rounded-md ${
          gender === "Female"
            ? "border-spiro-disco-ball bg-[#E1F7FF] text-chinese-black"
            : "border-gray-300 text-gray-500"
        }`}
        onClick={() => onSelectGender("Female")}
      >
        Female
      </button>
    </div>
  );
}

GenderSelection.propTypes = {
  gender: PropTypes.string.isRequired,
  onSelectGender: PropTypes.func.isRequired,
};
