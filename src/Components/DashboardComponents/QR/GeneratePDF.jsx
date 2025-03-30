import React, { useEffect, useState } from "react";
import { data } from "react-router-dom";
import Table from "../Table";

function GeneratePDF() {
  const [data, setData] = useState(() => {
    const local = localStorage.getItem("data");
    return local
      ? JSON.parse(local) //Convert string back to object type data
      : {
          ac_year: "",
          batch: "",
          semester: "",
          dep: "",
          spec: "",
          lec: "",
          lectr: "",
        }; //This is the default structure of the data -> this is must to acccess the parse object keys
  });

  return (
    <div className="p-10 space-y-0 border border-gray-300 rounded-lg ">
      <div className="border-b border-gray-900/10 pb-12">
        <div className=" flex  min-h-full flex-1 flex-col justify-center px-12 py-4 lg:px-8">
          <div className="mb-5 ">
            <h1 className="text-center  text-4xl font-serif  text-gray-900">
              SOUTH EASTERN UNIVERSITY OF SRI LANKA
            </h1>
            <h1 className="text-center  text-2xl font-serif  text-gray-900">
              Academic Year {data?.ac_year}
            </h1>
            <h1 className="text-center  text-2xl font-serif  text-gray-900">
              {data?.semester.slice(0, 1)}
              <sup>{data?.semester.slice(1, 3)}</sup> Semester
            </h1>
            <h1 className="text-center  text-2xl font-serif text-gray-900">
              {data?.lec}
            </h1>
            <h1 className="text-center  text-xl font-serif  text-gray-900">
              Attendace Marking Sheet
            </h1>
            <p className="text-center mb-4 text-sm/6 text-gray-600"></p>
          </div>
        </div>
        <Table />
      </div>
    </div>
  );
}

export default GeneratePDF;
