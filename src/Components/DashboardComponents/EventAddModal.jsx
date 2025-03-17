import React, { useEffect, useState } from "react";
import TimeContent from "./EventCard";
import Register from "../Register/Register";
import InputField from "../Common/InputField";
import DropDown from "../Common/DropDown";
import { BackspaceIcon } from "@heroicons/react/24/solid";

function EventAddModal({
  identifer,
  handleOpenCloseAddEvent,
  handleAddTimeRange,
}) {
  const [time, setTime] = useState({
    start_time: "",
    end_time: "",
  });
  const [lecture, setLecture] = useState({
    lecturer: "",
    lecuture: "",
    lecture_hall: "",
  });
  let formatedTime = "";
  const handleonChangeData = (e) => {
    const { name, value } = e.target;
    if (identifer === 1) {
      if (name === "start_time" || name === "end_time") {
        const timeValue = value;
        if (timeValue) {
          const [hours, minutes] = timeValue.split(":");
          const hour = +hours % 12 || 12;
          const ampm = +hours >= 12 ? "PM" : "AM";

          formatedTime = `${hour}:${minutes} ${ampm}`;
        }
      }
      setTime({
        ...time,
        [name]:
          name === "start_time" || name === "end_time" ? formatedTime : value,
      });
    } else {
      setLecture({
        ...lecture,
        [name]:
          value,
      });
    }
    
  };
  useEffect(()=>{
    alert(identifer)
  },[identifer])

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center mx-30 my-30">
        <div className="bg-white">
          {identifer === 1 ? (
            <div className="flex flex-col justify-center items-center border border-2 rounded-2xl px-5 py-5">
              <h1 className="text-center  text-2xl font-bold text-gray-900">
                Add Time Range
              </h1>
              <p className="text-center mb-5 text-sm/6 text-gray-600">
                Add Time range for your event
              </p>
              {/* <InputField  type={"text"} name="description" placeholder={"Add description if any"} label={"Description"} handleOnChange={handleonChangeData}></InputField> */}
              <InputField
                type={"time"}
                name="start_time"
                placeholder={"Add start time"}
                label="Start Time"
                handleOnChange={handleonChangeData}
              ></InputField>
              <InputField
                type={"time"}
                name="end_time"
                placeholder={"Add end Time"}
                label="End Time"
                handleOnChange={handleonChangeData}
              ></InputField>
              {/* <div className="mr-8">
               <DropDown  label="Meridiem " id={"meridiem"} name={"meridiem"} options={["am", "pm"]} handleOnChange={handleonChangeData}></DropDown>
             </div> */}
              <div className="flex flex-row gap-2 justify-center items-center px-2 py-2">
                <button
                  type="submit"
                  name="add"
                  onClick={() => handleAddTimeRange(time)}
                  className="rounded-md bg-indigo-600 px-3 py-2 mt-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add
                </button>
                <button
                  type="submit"
                  name="close"
                  onClick={handleOpenCloseAddEvent}
                  className="rounded-md bg-gray-600 px-3 py-2 mt-3 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center border border-2 rounded-2xl px-5 py-5">
              <h1 className="text-center  text-2xl font-bold text-gray-900">
                Add Lecture Schedule
              </h1>
              <p className="text-center mb-2  text-sm/6 text-gray-600">
                Add Lecture schedule with the Lecture hall
              </p>
              <div className="mr-16 py-2">
                <DropDown
                  label="Lecture"
                  name={"Lecture"}
                  options={[
                    "LH5",
                    "SWT",
                    "LH4",
                    "CIS",
                    "NST",
                    "MLT",
                    "MAL",
                    "WNT",
                  ]}
                  handleOnChange={handleonChangeData}
                ></DropDown>
              </div>

              <div className="mr-8">
                <DropDown
                  label="Lecture Hall"
                  name={"lecture_hall"}
                  options={[
                    "LH5",
                    "SWT",
                    "LH4",
                    "CIS",
                    "NST",
                    "MLT",
                    "MAL",
                    "WNT",
                  ]}
                  handleOnChange={handleonChangeData}
                ></DropDown>
              </div>
              <div className="flex flex-row gap-2 justify-center items-center px-2 py-2">
                <button
                  type="submit"
                  name="add"
                  onClick={() => handleAddTimeRange(data)}
                  className="rounded-md bg-indigo-600 px-3 py-2 mt-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add
                </button>
                <button
                  type="submit"
                  name="close"
                  onClick={handleOpenCloseAddEvent}
                  className="rounded-md bg-gray-600 px-3 py-2 mt-3 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Content */}
      </div>
    </div>
  );
}

export default EventAddModal;
