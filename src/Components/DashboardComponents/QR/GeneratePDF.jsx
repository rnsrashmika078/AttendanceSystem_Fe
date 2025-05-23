import React, { use, useContext, useEffect, useRef, useState } from "react";
import { data } from "react-router-dom";
import Table from "../Table";
import { AuthContext } from "../../AppContext/AuthContext";

function GeneratePDF({ sub_code }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [attendaceResult, setAttendaceResult] = useState([]);
  // const { sessionData } = useContext(AuthContext);

 
  const sessionData = JSON.parse(localStorage.getItem("session"))
  const Todaydate = new Date().toLocaleDateString("en-CA");

  useEffect(() => {
    console.log("SESSION DATA" ,sessionData);
  }, []);

  // const TOdaydata = "2025-03-31"

  // alert(Todaydate)
  const getAttendanceResult = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}get_attendance_result/${Todaydate}/${sub_code}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Error while retrieve Attendace");
      const data = await response.json();
      if (data) {
        setAttendaceResult(data.data);
        const convertToLocalTime = (utcTime) => {
          return new Date(utcTime).toLocaleString(); // Converts UTC to local time
        };
      }
    } catch (error) {
      // alert(error);
    }
  };

  useEffect(() => {
    getAttendanceResult();
  }, []);
  useEffect(() => {
    if (attendaceResult?.length === 0) {
      console.log("No data available in attendaceResult.");
    } else {
      console.log("Updated attendanceResult: ", attendaceResult);
    }
  }, [attendaceResult]);

  return (
    <div className="p-5 space-y-0 border border-[rgb(255,255,255)] rounded-lg ">
      <div className=" text-[rgb(10,2,2)] pb-12">
        <div className="flex min-h-full flex-1 flex-col justify-center px-12 py-4 lg:px-8">
          <div className="mb-5">
            {/* <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-serif text-[rgb(9,3,3)] font-bold">
              SOUTH EASTERN UNIVERSITY OF SRI LANKA
            </h1> */}
            <h1 className="text-center text-lg md:text-2xl lg:text-3xl font-serif text-[rgb(9,3,3)]">
              Academic Year {sessionData?.ac_year}
            </h1>
            <h1 className="text-center text-lg md:text-2xl lg:text-3xl font-serif text-[rgb(9,3,3)]">
              {/* {data?.semester?.slice(0, 1)} */}
              {/* <sup>{data?.semester.slice(1, 3)}</sup> Semester */}
            </h1>
            <h1 className="text-center text-lg md:text-2xl lg:text-3xl font-serif text-[rgb(9,3,3)]">
              {sessionData?.lec}
            </h1>
             <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-serif text-[rgb(9,3,3)] font-bold">
              Attendance Sheet
            </h1>
            <p className="text-center mb-4 text-sm md:text-base lg:text-lg text-[rgb(9,3,3)]"></p>
          </div>
        </div>
        <Table
          setAttendaceResult={setAttendaceResult}
          attendance={attendaceResult}
        />
      </div>
      <div className="flex justify-center align-center gap-5">
        <button
          className={
            "text-[rgb(255,255,255)] bg-[rgb(17,73,255)] hover:bg-[rgb(82,110,202)] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          }
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}

export default GeneratePDF;
