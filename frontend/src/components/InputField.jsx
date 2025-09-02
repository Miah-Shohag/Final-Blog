import React from "react";

const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  defaultValue,
  value,
  onChange,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full mt-3 relative">
      {label && (
        <label
          htmlFor={name}
          className="font-medium text-sm capitalize text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full border border-slate-300 dark:border-gray-600 
          px-4 py-2 text-sm rounded-md 
          text-black dark:text-gray-200 
          bg-white dark:bg-dark-secondary 
          placeholder:text-slate-400 dark:placeholder:text-gray-500
          caret-secondary
          focus:ring-2 focus:ring-secondary focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200`}
      />
    </div>
  );
};

export default InputField;
