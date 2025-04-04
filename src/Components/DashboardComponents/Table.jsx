import React, { useEffect, useState } from "react";

export default function Table({ attendance, setAttendaceResult }) {
  const [sortData, setSortData] = useState([]);

  const [sortOrderStatus, setsortOrderStatus] = useState({
    click_reg: false,
    click_name: false,
    click_record: false,
    click_attendance: true,
  });

  useEffect(() => {
    const dateSlice = attendance?.map((item) => {
      if (item.created_at) {
        return {
          ...item,
          created_at:
            item.created_at.slice(0, 10) + " " + item.created_at.slice(11, 16),
        };
      }
      return item;
    });
    const defaultSort = dateSlice?.sort((a, b) =>
      a.student_reg_no.localeCompare(b.student_reg_no)
    );
    setSortData(defaultSort);
  }, [attendance]);

  const getColumn = (column) => {
    switch (column) {
      case "no_col":
        break;
      case "register_no_col":
        const sortOnReg = [...sortData].sort((a, b) =>
          sortOrderStatus.click_reg
            ? a.student_reg_no.localeCompare(b.student_reg_no)
            : b.student_reg_no.localeCompare(a.student_reg_no)
        );
        setSortData(sortOnReg);
        setsortOrderStatus((prev) => ({
          ...prev,
          click_reg: !prev.click_reg,
        }));
        break;
      // case "student_name_col":
      //   const sortOnName = [...sortData].sort((a, b) =>
      //     sortOrderStatus.click_name
      //       ? a.student_name.localeCompare(b.student_name)
      //       : b.student_name.localeCompare(a.student_name)
      //   );
      //   setSortData(sortOnName);
      //   setsortOrderStatus((prev) => ({
      //     ...prev,
      //     click_name: !prev.click_name,
      //   }));
      //   break;
      // case "recorded_at_col":
      //   const sortOnRecord = [...sortData].sort((a, b) =>
      //     sortOrderStatus.click_record
      //       ? a.created_at.localeCompare(b.created_at)
      //       : b.created_at.localeCompare(a.created_at)
      //   );
      //   setSortData(sortOnRecord);
      //   setsortOrderStatus((prev) => ({
      //     ...prev,
      //     click_record: !prev.click_record,
      //   }));
      //   break;
      // case "attendance_status_col":
      //   const sortOnAttendance = [...sortData].sort((a, b) =>
      //     sortOrderStatus.click_attendance
      //       ? a.attendance.localeCompare(b.attendance)
      //       : b.attendance.localeCompare(a.attendance)
      //   );
      //   setSortData(sortOnAttendance);
      //   setsortOrderStatus((prev) => ({
      //     ...prev,
      //     click_attendance: !prev.click_attendance,
      //   }));
      //   break;
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left rtl:text-right">
        <thead className="text-xs sm:text-2xl border-1">
          <tr>
            <th scope="col" className="px-6 py-3 border-1">
              <div className="flex items-center">
                No
                <button
                  className="hover:cursor-pointer hover:scale-120"
                  onClick={() => getColumn("No_col")}
                >
                  <svg
                    className="w-5 h-5 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </button>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 border-1">
              <div className="flex items-center">
                Registration Number
                <button
                  className="hover:cursor-pointer hover:scale-120"
                  onClick={() => getColumn("register_no_col")}
                >
                  <svg
                    className="w-5 h-5 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </button>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 border-1">
              <div className="flex items-center">
                Student Name
                <button
                  className="hover:cursor-pointer hover:scale-120"
                  onClick={() => getColumn("student_name_col")}
                >
                  <svg
                    className="w-5 h-5 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </button>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 border-1">
              <div className="flex items-center">
                Recorded At
                <button
                  className="hover:cursor-pointer hover:scale-120"
                  onClick={() => getColumn("recorded_at_col")}
                >
                  <svg
                    className="w-5 h-5 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </button>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 border-1">
              <div className="flex items-center">
                Attendance Status
                <button
                  className="hover:cursor-pointer hover:scale-120"
                  onClick={() => getColumn("attendance_status_col")}
                >
                  <svg
                    className="w-5 h-5 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortData?.map((item, index) => (
            <tr
              key={index}
              className="bg-[rgb(255,255,255)] border-b  border-[rgb(255,255,255)]  hover:bg-[rgb(225,225,225)] text-xs sm:text-2xl"
            >
              <td className="px-6 py-4 border-1 ">{index + 1}</td>
              <td className="px-6 py-4 border-1 ">{item.student_reg_no}</td>
              <td className="px-6 py-4 border-1 ">{item.student_name}</td>
              <td className="px-6 py-4 border-1  ">{new Date(new Date(item.created_at).getTime() + 5.5 * 60 * 60 * 1000).toLocaleString('en-CA')}</td>
              <td className="px-6 py-4 border-1  ">
                {item.attendance === "true" ? "Present" : "Absent"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
