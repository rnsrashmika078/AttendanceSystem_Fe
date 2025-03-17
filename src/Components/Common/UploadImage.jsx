import React from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
function UploadImage({span,label,name,handleOnChange}) {
  return (
    <>
    <div className={`sm:col-span-${span}`}>
        <label
          htmlFor="cover-photo"
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              aria-hidden="true"
              className="mx-auto size-12 text-gray-300"
            />
            <div className="mt-4 flex text-sm/6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name={name}
                  type="file"
                  onChange={(e)=>handleOnChange(e)}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop to Set Display Picture</p>
            </div>
            <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default UploadImage;
