import React from "react";

interface InputProps {
  label: string;
  errors: { for: string; message: string }[];
  name: string;
  type?: string;
  placeholder?: string;
}

function Input({
  label,
  errors = [],
  name,
  type = "text",
  placeholder,
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        autoComplete="off"
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      />
      <div className="mt-1 text-xs text-red-500">
        {errors.find((error: any) => error.for === name)?.message}
      </div>
    </div>
  );
}

export default Input;
