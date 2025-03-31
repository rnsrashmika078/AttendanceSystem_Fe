import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Html5QrcodeScanner } from "html5-qrcode";
import QRForm from "./QRForm";
import TimeEditModal from "./TimeEditModal";
import GeneratePDF from "./GeneratePDF";

import { useNavigate } from "react-router-dom";
import { update } from "lodash";

function QrGenerator() {
  //Content API

  const [currentState, setCurrentState] = useState(false); //To track whether start click or not
  const [code, setCode] = useState("");
  const [initialize, setInitialize] = useState(false);
  const [initialTimer, setInitialeTimer] = useState([15, 0]);
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);
  const [reset, setReset] = useState(false);
  const [editTimer, setEditTimer] = useState(false);
  const [finished, setFinished] = useState(false);
  const [counter, setCounter] = useState(4);
  const [start, setStart] = useState(false); // Start the timer
  const [step, setStep] = useState(0); // this for debug purpose
  const [subCode, setSubCode] = useState("");
  const [viewAttendance, setViewAttendance] = useState(false);

  const navigate = useNavigate();

  const handleSetEditTimer = (e) => {
    const id = e.target;
    if (!editTimer) {
      setEditTimer(true);
    }
  };

  const handleFinish = () => {
    if (finished) {
      setViewAttendance(true);
      // updatedQrCode("Finished");
      // navigate("/pdf");
    }
  };

  const updatedQrRecordHistory = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/create_qr_record",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ sub_code: subCode, status: "Finished" }),
        }
      );

      if (!response.headers) {
        throw new Error("Error while getting response from !");
      }
      const data = await response.json();
      if (data) {
        alert(data)
      }
    } catch (error) {
      alert(error);
    }
  };
  const updatedQrCode = async (custom) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/qr_update/${subCode}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            qr_code: custom
              ? custom
              : reset
              ? "reset"
              : finished
              ? "finished"
              : currentState
              ? "ready"
              : code,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update QR");

      const data = await response.json();
      // console.log("QR Update Response:", data);
    } catch (error) {
      console.error("Error updating QR:", error);
    }
  };

  const deletQrCode = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/qr_delete/${subCode}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to delete QR");

      const data = await response.json();
      // console.log("QR Update Response:", data);
    } catch (error) {
      console.error("Error delete QR:", error);
    }
  };

  useEffect(() => {
    if (currentState || start || code) {
      updatedQrCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState, start, code]);

  useEffect(() => {
    if (!finished && minutes === 0 && seconds === 0) {
      setFinished(true);
    }
  }, [minutes, seconds, finished]);

  //Start counter
  const handleStartTimer = (currentState) => {
    setReset(false);
    setFinished(false);
    setStep(0);
    setInitialeTimer([minutes, seconds]);
    setCurrentState(currentState);
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(interval);
          setStart(true);
          setCurrentState(false);
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  };

  // Reset the timer
  const handleResetTimer = () => {
    setSeconds(initialTimer?.[1]);
    setMinutes(initialTimer?.[0]);
    setStart(false);
    setCounter(4);
    setCurrentState(false);
    setStep(0);
    setReset(true);
    updatedQrCode("reset");

    clearTimeout();
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setCode(value);
  };

  useEffect(() => {
    const time = step <= 0 ? 5000 : 30000;
    // const time = 15000;
    if (finished) {
      updatedQrRecordHistory();
      deletQrCode();

      return;
    }
    if (currentState || start) {
      const timeOut = setTimeout(() => {
        const randomCode =
          Math.random().toString(36).substring(2, 10).toUpperCase() + subCode;
        setCode(randomCode);
        setStep((prevStep) => prevStep + 1);
      }, time);
      return () => clearTimeout(timeOut);
    }
  }, [finished, reset, currentState, step, subCode, start]);

  useEffect(() => {}, [code]);
  const displayQRCode = () => {
    return (
      <>
        {finished ? null : (
          <>
            <QRCode value={code} />
            <input
              className="flex p-2 text-center align-middle justify-center m-auto hidden:none"
              onChange={handleOnChange}
              type="text"
              value={code}
            ></input>
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    let interval;

    if (start) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      setSeconds(seconds);
      setMinutes(minutes);
    }
    return () => clearInterval(interval);
  }, [start, seconds, minutes]);

  return (
    <div>
      {" "}
      {/*Main Div*/}
      {viewAttendance ? (
        <div>
          <GeneratePDF sub_code={subCode} />
        </div>
      ) : (
        <div>
          {editTimer ? (
            <TimeEditModal
              setEditTimer={setEditTimer}
              setCurrentMinute={setMinutes}
              setCurrentSecond={setSeconds}
              currentMinute={minutes}
              currentSecond={seconds}
            />
          ) : null}
          {initialize ? (
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
                className={
                  minutes < 5 ? "text-7xl text-red-600 py-2" : "text-7xl py-2"
                }
              >
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </div>
              {finished ? (
                <div>
                  <div
                    className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                    role="alert"
                  >
                    <p className="font-bold text-center text-3xl">
                      TIME IS UP!
                    </p>
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
                        <span>
                          {"QR Code will display here once click Start"}{" "}
                        </span>
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
          ) : (
            //   Form to setup QR
            <QRForm setInitialize={setInitialize} setSubCode={setSubCode} />
          )}
        </div>
      )}
    </div>
  );
}

export default QrGenerator;
