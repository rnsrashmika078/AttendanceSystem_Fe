import React, { use, useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./qrStyle.css";
import { AuthContext } from "../../AppContext/AuthContext";
import { Steps } from "openai/resources/beta/threads/runs/steps.mjs";
import { useNavigate } from "react-router-dom";
function QrScanner() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const Navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [scanResult, setScanResult] = useState("");
  const [id, setId] = useState("");
  const [scandata, setScanData] = useState([]);
  const [notifier, setNotifer] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [currentTime, setCurrentTime] = useState();
  // const [resetMin,setResetMin] = useState(0)
  // const [resetSec,setResetSec] = useState(0)

  const localSucces = localStorage.getItem("success");
  const todayDate = new Date().toLocaleDateString("en-CA");
  const [attendance, setAttendance] = useState({
    attendance: "",
    subject_code: "",
    student_reg_no: "",
    student_name: "",
  });

  const [attendanceResult, setAttendaceResult] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (scanResult) {
      setId(scanResult?.slice(8, 16));
      localStorage.setItem("id", scanResult?.slice(8, 16));
    }
  }, [scanResult]);

  const fetchRecords = async () => {
    try {
      const response = await fetch(
        // `http://localhost:8000/api/get_record_history/${todayDate}/${id}`,
        `${API_BASE_URL}get_record_history/${todayDate}/${localStorage.getItem(
          "id"
        )}`,

        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error while retriieveing Records!");
      }
      const responseData = await response.json();
      if (responseData) {
        if (responseData.data) {
          if (responseData?.data[0]?.status === "Finished") {
            setFinish(true);
            localStorage.removeItem("success");
          } else if (responseData?.data[0].status === "Reset") {
            setReset(true);
          }
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // useEffect(() => {
  //   const timeInterval = setInterval(() => {
  //     setResetTime(prev => prev + 1)
  //   }, 1000);
  //   return () => clearInterval(timeInterval);
  // }, []);

  useEffect(() => {
    if (scanResult) {
      if (scandata?.qr_code === scanResult) {
        setSuccess(true);
        localStorage.setItem("success", true);
        localStorage.setItem("successTime", new Date());

        setAttempt(attempt + 1);
        const updatedAttendance = {
          attendance: "true",
          subject_code: id,
          student_reg_no: user?.registration_no,
          student_name: user?.init_name,
        };
        fetch(`${API_BASE_URL}mark_attendance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAttendance),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status) {
              setNotifer(data.message);
            }
          })
          .catch((error) => {});
      } else {
        setAttempt(attempt + 1);
        setSuccess(false);
        setAttendance(null);
      }
    }
  }, [scandata, scanResult, id, user?.registration_no, user?.init_name]);

  useEffect(() => {
    if (id) {
      updatedQrCode();
    }
  }, [id]);



  const successTime = localStorage.getItem("successTime")
    ? new Date(localStorage.getItem("successTime"))
    : new Date();
  const resetTime = successTime ? new Date(successTime.getTime() + 1.5 * 60 * 1000) : null;

  useEffect(() => {
    if (localSucces) {
      const interval = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
        if (Math.abs(new Date().getTime() - resetTime.getTime()) < 1000) {
          localStorage.removeItem("success");
          localStorage.removeItem("id");
          localStorage.removeItem("successTime")
          Navigate("/dashboard");
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);
  const updatedQrCode = async () => {
    await fetch(`${API_BASE_URL}qr_get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setScanData(data.data);
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    if (!localSucces) {
      const scanner = new Html5QrcodeScanner("reader", {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      });

      scanner.render(success, error);

      function success(result) {
        scanner.clear();
        setScanResult(result);
      }
      function error(err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <div className="bg-gray-100 py-2 px-2">
      <div className="max-w-lg mx-auto bg-gray-200  text-black p-3 rounded-2xl shadow-1xl text-center w-full">
        <div className="flex flex-col sm:flex-col gap-5 mx-0 sm:mx-10 mt-5">
          <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 w-full max-w-md"></div>
          <div className="flex flex-col sm:flex-col justify-center align-middle  gap-5 mx-0 sm:mx-5">
            <h2 className="text-2xl font-bold px-auto ">
              Mark Your Attendance
            </h2>
            <p className="text-gray-500 mb-1 font-bold px-auto ">
              Attendance Mark by scanning QR Code
            </p>
            {localSucces ? (
              <p>Reset At : {resetTime.toLocaleTimeString()}</p>
            ) : null}
            {/* Return : <a>{qrCode ? qrCode : "null"}</a> */}
            <div className="w-full flex m-auto justify-center align-middletext-center">
              {scanResult || localSucces ? (
                localSucces ? (
                  // Green Success
                  <div>
                    <div className="flex align-middle justify-center text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        shapeRendering="geometricPrecision"
                        textRendering="geometricPrecision"
                        imageRrendering="optimizeQuality"
                        fillRule="evenodd"
                        clipRrule="evenodd"
                        viewBox="0 0 512 512"
                        width="256"
                        height="256"
                      >
                        <path
                          fill="#3AAF3C"
                          d="M256 0c141.39 0 256 114.61 256 256S397.39 512 256 512 0 397.39 0 256 114.61 0 256 0z"
                        />
                        <path
                          fill="#0DA10D"
                          fillRule="nonzero"
                          d="M391.27 143.23h19.23c-81.87 90.92-145.34 165.89-202.18 275.52-29.59-63.26-55.96-106.93-114.96-147.42l22.03-4.98c44.09 36.07 67.31 76.16 92.93 130.95 52.31-100.9 110.24-172.44 182.95-254.07z"
                        />
                        <path
                          fill="#fff"
                          fillRule="nonzero"
                          d="M158.04 235.26c19.67 11.33 32.46 20.75 47.71 37.55 39.53-63.63 82.44-98.89 138.24-148.93l5.45-2.11h61.06c-81.87 90.93-145.34 165.9-202.18 275.53-29.59-63.26-55.96-106.93-114.96-147.43l64.68-14.61z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h1>
                        {notifier
                          ? notifier
                          : "Your attendance has already been marked successfully!"}
                      </h1>
                    </div>
                  </div>
                ) : !scandata ? (
                  // Gray Error -> Expired
                  <div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        shape-rendering="geometricPrecision"
                        text-rendering="geometricPrecision"
                        image-rendering="optimizeQuality"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        viewBox="0 0 512 512"
                        width="256"
                        height="256"
                      >
                        <path
                          fill="#848484"
                          d="M74.981 74.981c99.976-99.975 262.063-99.975 362.038 0 99.975 99.976 99.975 262.063 0 362.038-99.975 99.975-262.062 99.975-362.038 0-99.975-99.975-99.975-262.063 0-362.038zm270.295 91.742l.003.003c8.86 8.86 8.819 23.415.003 32.232l-57.043 57.043 59.133 59.133c8.861 8.861 8.856 23.375-.002 32.233l-.003.002c-8.86 8.861-23.417 8.818-32.232.003l-59.134-59.134-57.041 57.041c-8.816 8.816-23.411 8.823-32.234 0l-.003-.003c-8.824-8.823-8.865-23.37 0-32.234l57.041-57.041-59.133-59.132c-8.815-8.816-8.821-23.414 0-32.235l.003-.003c8.821-8.821 23.372-8.863 32.235 0l59.133 59.132 57.043-57.043c8.861-8.862 23.375-8.853 32.231.003z"
                        />
                      </svg>
                      <div>
                        <h1>Session Expired!</h1>
                      </div>
                    </div>
                  </div>
                ) : (
                  // red error -> invalid QR Scan
                  <div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        shape-rendering="geometricPrecision"
                        text-rendering="geometricPrecision"
                        image-rendering="optimizeQuality"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        viewBox="0 0 512 512"
                        width="256"
                        height="256"
                      >
                        <path
                          fill="#FD3B3B"
                          d="M74.981 74.981c99.976-99.975 262.063-99.975 362.038 0 99.975 99.976 99.975 262.063 0 362.038-99.975 99.975-262.062 99.975-362.038 0-99.975-99.975-99.975-262.063 0-362.038zm270.295 91.742l.003.003c8.86 8.86 8.819 23.415.003 32.232l-57.043 57.043 59.133 59.133c8.861 8.861 8.856 23.375-.002 32.233l-.003.002c-8.86 8.861-23.417 8.818-32.232.003l-59.134-59.134-57.041 57.041c-8.816 8.816-23.411 8.823-32.234 0l-.003-.003c-8.824-8.823-8.865-23.37 0-32.234l57.041-57.041-59.133-59.132c-8.815-8.816-8.821-23.414 0-32.235l.003-.003c8.821-8.821 23.372-8.863 32.235 0l59.133 59.132 57.043-57.043c8.861-8.862 23.375-8.853 32.231.003z"
                        />
                      </svg>
                      <div>
                        <h1>Invalid QR Code</h1>
                      </div>
                    </div>
                  </div>
                )
              ) : localSucces ? null : (
                <div className="text-center" id="reader"></div>
              )}
            </div>
            {/* <div>
              {scanResult
                ? scanResult
                : localStorage.getItem("id")
                ? localStorage.getItem("id")
                : "NO SCAN RESULT"}
            </div> */}
            {/* <div>
              {!success || !localSucces ? (
                <h1>{sessionExpired ? "Session Expired!" : ""}</h1>
              ) : null}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrScanner;
