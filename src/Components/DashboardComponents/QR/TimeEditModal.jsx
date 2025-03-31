import React, { useEffect, useState } from "react";

function TimeEditModal({
  setEditTimer,
  setCurrentMinute,
  setCurrentSecond,
  currentMinute,
  currentSecond,
}) {
  const [currentMinuteModal, setCurrentMinuteModal] = useState(currentMinute);
  const [currentSecondModal, setCurrentSecondModal] = useState(currentSecond);

  const handleTimeChange = (type) => {
    switch (type) {
      case "min_up":
        minuteUp();
        break;
      case "min_down":
        minDown();
        break;
      case "sec_up":
        secUp();
        break;
      case "sec_down":
        secDown();
        break;
    }
  };

  const updateTimer = () => {
    if (
      currentMinuteModal == 0 &&
      currentSecondModal >= 0 &&
      currentSecondModal <= 59
    ) {
      return;
    } else {
      setCurrentMinute(currentMinuteModal);
      setCurrentSecond(currentSecondModal);
      setEditTimer(false);
    }
  };

  const minuteUp = () => {
    let cur_min = currentMinuteModal + 1;
    if (cur_min >= 0 && cur_min <= 20) {
      // if (cur_min === 1) {
      //   alert("Aleast Minute is the minimum from up");
      //   return
      // }
      setCurrentMinuteModal(cur_min);
    } else {
      setCurrentMinuteModal(0);
    }
  };
  const minDown = () => {
    let cur_min = currentMinuteModal - 1;
    if (cur_min >= 0 && cur_min <= 20) {
      // if (cur_min === 0) {
      //   alert("Aleast Minute is the minimum from down");
      //   return
      // }
      setCurrentMinuteModal(cur_min);
    } else {
      setCurrentMinuteModal(20);
    }
  };

  const secUp = () => {
    let cur_sec = currentSecondModal + 1;
    if (cur_sec >= 0 && cur_sec <= 59) {
      setCurrentSecondModal(cur_sec);
    } else {
      setCurrentSecondModal(0);
    }
  };
  const secDown = () => {
    let cur_sec = currentSecondModal - 1;
    if (cur_sec >= 0 && cur_sec <= 59) {
      setCurrentSecondModal(cur_sec);
    } else {
      setCurrentSecondModal(59);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-5 overflow-auto  ">
        <div className="bg-white ">
          <div className="flex flex-col justify-center items-center border border-l-5 border-r-5 rounded-2xl px-5 py-5">
            <h1 className="text-center text-2xl font-bold text-gray-900">
              Edit Timer
            </h1>
            <p className="text-center mb-2 mt-2 text-sm text-gray-600">
              Edit Attendance Duration and QR code Update/rest Timer
            </p>
            <div className="flex flex-col  mx-0 sm:mx-10">
              <label className="block text-sm/6 font-medium text-center text-gray-900">
                Attendance Duration
              </label>
              {/* Minute Up */}
              <button
                onClick={() => handleTimeChange("sec_up")}
                className="relative left-27 top-6 w-6 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              </button>

              {/* Second up */}
              <button
                onClick={() => handleTimeChange("min_up")}
                className="relative left-5 w-6 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              </button>

              {/* Timer */}
              <h1 className="text-center text-5xl font-bold ">
                {currentMinuteModal?.toString().length < 2
                  ? `0${currentMinuteModal}`
                  : currentMinuteModal}{" "}
                :{" "}
                {currentSecondModal?.toString().length < 2
                  ? `0${currentSecondModal}`
                  : currentSecondModal}{" "}
              </h1>

              {/* Minute Down */}
              <button
                onClick={() => handleTimeChange("min_down")}
                className="relative left-5 top-2 w-6 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              {/* Second Down */}
              <button
                onClick={() => handleTimeChange("sec_down")}
                className="relative left-27 bottom-4 w-6 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </div>
            <div className="flex justify-center align-center gap-2">
              <button
                onClick={updateTimer}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Set
              </button>
              <button
                onClick={() => setEditTimer(false)}
                className="text-white bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  dark:hover:bg-gray-700 dark:focus:ring-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeEditModal;
// const dropDown = (
//   id,
//   label,
//   selectionName,
//   placeholder,
//   year,
//   span,
//   specialization,
//   existData,
//   handleChange,
//   fieldValue
// ) => {
//   let option;

//   return (
//     <div>
//       <div className={`mt-2 grid grid-cols-${span}`}>
//         <select
//           name={selectionName}
//           value={fieldValue || existData}
//           onChange={(e) => handleChange(e)}
//           // autoComplete={autoComplete}
//           className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//         >
//           <option contentEditable={false} disabled={true}>
//             {placeholder}
//           </option>
//           {/* {option.map((item, index) => (
//             <option key={index} value={item}>
//               {item}
//             </option>
//           ))} */}
//         </select>
//       </div>
//     </div>
//   );
// };
