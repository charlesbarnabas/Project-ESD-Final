import PropTypes from "prop-types";

export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  name,
}) {
  return (
    <div className="flex items-center">
      <label className="block w-[150px] text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="block w-3/4 p-5 border border-gainsboro rounded-md focus:ring-spiro-disco-ball focus:border-spiro-disco-ball outline-none"
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
