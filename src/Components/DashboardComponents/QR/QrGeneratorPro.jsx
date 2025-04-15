import React, { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Html5QrcodeScanner } from "html5-qrcode";
import QRForm from "./QRForm";
import TimeEditModal from "./TimeEditModal";
import GeneratePDF from "./GeneratePDF";

import { useNavigate } from "react-router-dom";
import { update } from "lodash";
import { AuthContext } from "../../AppContext/AuthContext";
import Timer from "./Timer";

function QrGeneratorPro() {
  //Content API
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { exitFromBrowser } = useContext(AuthContext);

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
  // const [qrTime,setQrTime] = useState(5000);

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
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave?";
    };

    const handleUnload = () => {
      console.log("User left the page");
      exitFromBrowser();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  // const QrChangeTime = (e) => {
  //   const { value } = e.target;
  //   setQrTime(value);
  // };
  const updatedQrRecordHistory = async (status) => {
    try {
      const response = await fetch(`${API_BASE_URL}create_qr_record/${subCode}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ sub_code: subCode, status: status}),
      });

      if (!response.headers) {
        throw new Error("Error while getting response from !");
      }
      const data = await response.json();
      if (data) {
        console.log(data)
      }
    } catch (error) {
      console.log(error)

    }
  };
  const updatedQrCode = async (custom) => {
    try {
      const response = await fetch(`${API_BASE_URL}qr_update/${subCode}`, {
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
      });

      if (!response.ok) throw new Error("Failed to update QR");

      const data = await response.json();
      // console.log("QR Update Response:", data);
    } catch (error) {
      console.error("Error updating QR:", error);
    }
  };

  const deleteQrCode = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}qr_delete/${subCode}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

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
      console.log("Qr Code Updated!")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState, start, code]);

  useEffect(() => {
    if (!finished && minutes === 0 && seconds === 0) {
      setFinished(true);
    }
    if(finished){
      console.log(finished)

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
    updatedQrRecordHistory("Reset")
    clearTimeout();
  };
  // 2 reqeuset when click reset 

  const handleOnChange = (e) => {
    const { value } = e.target;
    setCode(value);
  };

// 2 request when finished
  useEffect(() => {
    const time = step <= 0 ? 5000 : 30000;
    // const time = 15000;
    if (finished) {
      updatedQrRecordHistory("Finished");
      console.log("delete")
      deleteQrCode();
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
            <Timer finished={finished} currentState={currentState} start={start}  minutes={minutes} seconds={seconds} counter={counter} handleFinish={handleFinish} handleStartTimer={handleStartTimer} handleSetEditTimer={handleSetEditTimer} handleResetTimer={handleResetTimer} displayQRCode={displayQRCode}/>
          ) : (
            //   Form to setup QR
            <QRForm setInitialize={setInitialize} setSubCode={setSubCode} />
          )}
        </div>
      )}
    </div>
  );
}

export default QrGeneratorPro;
