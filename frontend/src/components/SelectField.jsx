import React from "react";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full mt-3 relative">
      {label && (
        <label
          htmlFor={name}
          className="font-medium text-sm text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full border border-slate-300 dark:border-gray-600 
          px-4 py-2 text-sm rounded-md
          text-black dark:text-gray-200
          bg-white dark:bg-dark-secondary
          placeholder:text-slate-400 dark:placeholder:text-gray-500
          focus:ring-2 focus:ring-secondary focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200`}
      >
        <option value="" className="text-gray-400 dark:text-gray-500">
          -- Select --
        </option>
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
