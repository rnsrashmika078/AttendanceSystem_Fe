import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  } from "@headlessui/react";
import React from 'react'
function Toggler({isOpen,setIsOpen}) {
  return (
    <div  as="nav"
    className="bg-gray-200"
    style={{ zIndex: "1", position: "sticky", top: "0px" }}
    >
             
      <div className={`transition-transform ${isOpen ? '-translate-x-0': '-translate-x-65'}`}>
        <button
          className="absolute left-62 top-75  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          onClick={()=>setIsOpen(!isOpen)}
          data-drawer-target="drawer-navigation"
          data-drawer-show="drawer-navigation"
          aria-controls="drawer-navigation"
        >
          {">"}
        </button>
      </div>
    </div>
  )
}

export default Toggler
