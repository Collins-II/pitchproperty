"use client";

import React from "react";

interface InputProps<K extends string> {
  id: K; // Enforces strict key typing
  label: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  errors?: Partial<Record<K, string>>; // Supports a strict error mapping
  handleDispatch: (key: K, value: string) => void; // Restrict key to valid types
}

const Input = <K extends string>({
  id,
  label,
  type = "text",
  disabled,
  placeholder,
  required,
  errors = {},
  handleDispatch,
}: InputProps<K>) => {
  const hasError = Boolean(errors[id]); // Check if the specific key has an error

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDispatch(id, e.target.value); // Dispatch changes with a valid key
  };

  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${hasError ? "border-rose-500" : "border-neutral-300"}
          ${hasError ? "focus:border-rose-500" : "focus:border-black"}
        `}
        required={required}
      />
      <label
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${hasError ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
