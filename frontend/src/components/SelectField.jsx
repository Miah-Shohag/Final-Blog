import React from "react";

const SelectField = ({ label, name, value, onChange, options }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-medium mb-2 text-sm">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-slate-300 dark:text-gray-400 dark:border-gray-500 px-4 py-2 text-sm text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-md"
      >
        <option value="" className="text-gray-300">
          -- Select --
        </option>
        {options?.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
