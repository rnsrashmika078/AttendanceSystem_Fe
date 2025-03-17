import React from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
function ProfileImage({span}) {
  return (
    <div className={`sm:col-span-${span}`}>
      <label
        htmlFor="photo"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Photo
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        <UserCircleIcon aria-hidden="true" className="size-12 text-gray-300" />
        <button
          type="button"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
        >
          Change
        </button>
      </div>
    </div>
  );
}

export default ProfileImage;
