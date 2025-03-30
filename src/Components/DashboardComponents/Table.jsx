import React from "react";

export default function Table() {
  return (
    <div className="relative overflow-x-auto shadow-md ">
      <table className="w-full text-sm text-center ">
        <thead className="text-xs dark:border-gray-700">
          <tr className="border  text-gray-900">
            <th scope="col" className="px-6 py-3 border-1 ">
              No
            </th>
            <th scope="col" className="px-6 py-3 border-1 ">
              Registration Number
            </th>
            <th scope="col" className="px-6 py-3 border-1 ">
              Student Name
            </th>
            <th scope="col" className="px-6 py-3 border-1 ">
              Attendance
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border  text-gray-900">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-1   "
            >
              1
            </th>
            <td className="px-6 py-4 border-1 ">SEU/IS/20/ICT/076</td>
            <td className="px-6 py-4 border-1  ">M.W.R.N.Siriwardhana</td>
            <td className="px-6 py-4 border-1 ">{}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
