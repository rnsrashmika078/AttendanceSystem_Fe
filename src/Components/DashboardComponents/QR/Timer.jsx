import { useState } from "react";

const Timer = ({
  finished,
  currentState,
  start,
  minutes,
  seconds,
  counter,
  handleFinish,
  handleStartTimer,
  handleSetEditTimer,
  handleResetTimer,
  displayQRCode
}) => {
  return (
    <div
      style={{
        background: "white",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        inset: 0,
      }}
    >
      <div className="flex justify-center align-center gap-5">
        <button
          id={finished ? "extends" : "edit"}
          disabled={currentState || finished || start ? true : false}
          onClick={handleSetEditTimer}
          className={
            currentState || start || finished
              ? "text-gray-500  bg-gray-300 w-full sm:w-auto px-5 py-2.5 border-0 rounded-xl"
              : "text-white bg-dark hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-gray-800 dark:focus:ring-blue-800"
          }
        >
          {finished ? "Extend the Timer" : "Edit Timer"}
        </button>
      </div>
      <div
        className={minutes < 5 ? "text-7xl text-red-600 py-2" : "text-7xl py-2"}
      >
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      {/* <div>
      <input onChange={QrChangeTime} value={qrTime} name="qrTime"/>
    </div> */}
      {finished ? (
        <div>
          <div
            className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
            role="alert"
          >
            <p className="font-bold text-center text-3xl">TIME IS UP!</p>
            <p className="text-center text-2xl">
              Thanks you for your cooperation
            </p>
          </div>
          <div className="flex justify-center align-center gap-5 p-2">
            <button
              onClick={handleFinish}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View Attendance Sheet
            </button>
          </div>
        </div>
      ) : (
        <div>
          {start && !finished ? (
            displayQRCode()
          ) : (
            <h1
              className={
                counter < 4
                  ? "w-full p-5 text-center font-extralight"
                  : "w-full p-5 text-center font-extralight"
              }
            >
              {counter < 4 ? (
                <span>
                  {" "}
                  QR Code Display in{" "}
                  <span className="text-2xl font-bold text-red-600">
                    {counter}
                  </span>{" "}
                  seconds{" "}
                </span>
              ) : (
                <span>{"QR Code will display here once click Start"} </span>
              )}
            </h1>
          )}

          <div className="flex justify-center align-center gap-5">
            <button
              disabled={currentState || start ? true : false}
              className={
                currentState || start
                  ? "text-gray-500  bg-gray-300 w-full sm:w-auto px-5 py-2.5 border-0 rounded-xl"
                  : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }
              onClick={() => handleStartTimer(true)}
            >
              Start
            </button>
            <button
              className="text-white bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  dark:hover:bg-gray-700 dark:focus:ring-blue-800"
              onClick={handleResetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
