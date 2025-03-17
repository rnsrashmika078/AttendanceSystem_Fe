import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SubjectContent({description,subject,at,addEvent,handleOpenCloseAddEvent}) {
  return (
    <>

    
    <div className="relative w-25 flex  flex-col bg-white group">
      {addEvent ? 
      <>
      <span className={`mx-2 my-0 text-xs font-bold`}>{description}</span>
      <div className="flex flex-col px-1 py-1 overflow-auto">
        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs ">
          <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
          <span className={`ml-2 font-light leading-none`}>{subject}{at}</span>
          <span className={`ml-2 font-medium text-transparent leading-none truncate`}>
           A
          </span>
        </button>
        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs ">
          <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
          <span className="ml-2  font-medium leading-none ">{subject}{at}</span>
          <span className="ml-2  font-medium text-transparent leading-none truncate">
          A
          </span>
        </button>
      </div>
      </>
      :
      <>
      <span className={`mx-2 my-0 text-xs font-bold`}>{description}</span>
      <div className="flex flex-col px-1 py-1 overflow-auto">
        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs ">
          <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
          <span className={`ml-2 font-light leading-none `}>{subject}{at}</span>
          <span className={`ml-2 font-medium text-transparent leading-none truncate`}>
             A
          </span>
        </button>
        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs ">
          <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
          <span className="ml-2  font-medium leading-none ">{subject}{at}</span>
          <span className="ml-2  font-medium text-transparent leading-none truncate">
          A
          </span>
        </button>
      </div>
      </>
      }
      <button name="add" value="add" onClick={(e)=>handleOpenCloseAddEvent(e)} className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-0 mr-0 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
        <svg
         
          // className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6 plus"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
    </>
  );
}

export default SubjectContent;
