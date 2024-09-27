import PropTypes from "prop-types";

export default function TextareaField({ label, name, value, onChange }) {
  return (
    <div className="flex items-center">
      <label className="block w-[150px] text-sm font-medium">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="block w-3/4 p-5 border border-gainsboro rounded-md focus:ring-spiro-disco-ball focus:border-spiro-disco-ball outline-none"
      />
    </div>
  );
}

TextareaField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
