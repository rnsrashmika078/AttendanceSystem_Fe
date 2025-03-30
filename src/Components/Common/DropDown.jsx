import React from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
function DropDown({
  span,
  htmlFor,
  label,
  id,
  name,
  autoComplete,
  options,
  handleOnChange,
}) {
  return (
    <div className={`sm:col-span-${span}`}>
      <label
        htmlFor={htmlFor}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2 grid grid-cols-1">
        <select
          id={id}
          name={name}
          // value={currentSelection || ""}
          onChange={handleOnChange}
          autoComplete={autoComplete}
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        >
          <option contentEditable={false} selected={true} disabled={true}>
            Choose {label}
          </option>
          {options
            ? options.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))
            : null}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        />
      </div>
    </div>
  );
}

export default DropDown;
