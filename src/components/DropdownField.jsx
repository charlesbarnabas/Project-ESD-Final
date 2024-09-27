import PropTypes from "prop-types";
import { useState } from "react";
import ChevronDown from "../assets/chevron-down.png";

export default function Dropdown({ label, options, selectedValue, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center">
      <label className="w-[150px] block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className="relative w-3/4 flex cursor-pointer items-center justify-around p-5 border border-gray-300 rounded-md bg-white text-left focus:ring-blue-500 focus:border-blue-500"
        onClick={toggleDropdown}
      >
        <div className="w-full">
          <button type="button" className="">
            {selectedValue || "Select an option"}
          </button>
          {isOpen && (
            <div className="absolute z-10 mt-6 left-[-1px] w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <ul className="py-1">
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(option)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <img src={ChevronDown} alt="chevron-down" className="w-3 h-3" />
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
