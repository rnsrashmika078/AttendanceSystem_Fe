import { BackspaceIcon } from "@heroicons/react/24/solid";
import {  useRef, useState } from "react";
import { useAppContext } from "../AppContext/AppContext";
const EventAddModalNew = ({
  studyYear,
  setModalVisibility,
  editData,
  specialization,
  editItemId,
  fetchAllData,
  HandleNotifier,
  currentDay,
}) => {
  //handle form data
  const [newData, setNewData] = useState({
    start_time: "",
    end_time: "",
    year_1_lecture: "",
    year_1_lecturer: "",
    year_1_lecture_hall: "",

    year_2_lecture: "",
    year_2_lecturer: "",
    year_2_lecture_hall: "",

    year_3_lecture: "",
    year_3_lecturer: "",
    year_3_lecture_hall: "",

    year_4_lecture: "",
    year_4_lecturer: "",
    year_4_lecture_hall: "",
  });

  // Custom Context API
  const { setMessageBody } = useAppContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]:  value,
    }));
  };

  // check state change : check whether any changes have been made by the use or not
  const prevData = useRef(newData);

  // to get the options based on year
  let Options = getOptionByYear();

  // handle Save Data coming from edit form
  const handleSave = async () => {
    await fetch(`http://localhost:8000/api/update/${editItemId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchAllData();
          setModalVisibility(false);
          if (prevData.current === newData) {
            setMessageBody("No Changes have been Made!");
            HandleNotifier(true, "warning");
          } else {
            setMessageBody("Slot has been Edited Successfully!");
            HandleNotifier(true, "add");
          }
          prevData.current = newData;
        }
      })
      .catch((error) => {
        alert(error)
      });
  };
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-5 overflow-auto  ">
        <div className="bg-white ">
          <div className="flex flex-col justify-center items-center border border-l-5 border-r-5 rounded-2xl px-5 py-5">
            <h1 className="text-center text-2xl font-bold text-gray-900">
              Edit{" "}
              <span className="text-red-500">
                {studyYear.slice(5, 6)} {studyYear.slice(0, 4).toUpperCase()}'s{" "}
              </span>
              <span className="text-blue-500">{currentDay} </span>Lecture
              Shedule
            </h1>
            <p className="text-center mb-2 mt-2 text-sm text-gray-600">
              Here you can manage and edit the current lecture schedule to
              latest update
            </p>
            <div className="flex flex-col sm:flex-row gap-5 mx-0 sm:mx-10 mt-5">
              {inputField(
                "start",
                "Start Time",
                "start_time",
                "time",
                "Enter Start Time",
                0,
                editData?.start_time,
                handleChange,
                newData.start_time
              )}
              {inputField(
                "end",
                "End Time",
                "end_time",
                "time",
                "Enter End Time",
                0,
                editData?.end_time,
                handleChange,
                newData.end_time
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-5 mx-0 sm:mx-10 mt-5">
              {dropDown(
                "lecture",
                "Lecture",
                `${studyYear}_lecture`,
                "Choose Lecture",
                studyYear,
                0,
                specialization,
                editData[`${studyYear}_lecture`],
                handleChange,
                newData[`${studyYear}_lecture`]
              )}
              {inputField(
                "lecturer",
                "Lecturer",
                `${studyYear}_lecturer`,
                "text",
                "Enter Lecturer Name",
                0,
                editData[`${studyYear}_lecturer`],
                handleChange,
                newData[`${studyYear}_lecturer`]
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-5 mx-0 sm:mx-10 mt-5">
              {dropDown(
                "hall",
                "Lecture Hall",
                `${studyYear}_lecture_hall`,
                "Choose Lecture Hall",
                studyYear,
                0,
                specialization,
                editData[`${studyYear}_lecture_hall`],
                handleChange,
                newData[`${studyYear}_lecture_hall`]
              )}
            </div>
            {buttons(setModalVisibility, handleSave)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventAddModalNew;

const buttons = (setModalVisibility, handleSave) => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center px-2 py-2">
      <button
        type="submit"
        name="add"
        onClick={handleSave}
        className="rounded-md bg-blue-600 px-3 py-2 mt-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add
      </button>
      <button
        type="submit"
        name="close"
        onClick={() => setModalVisibility(false)}
        className="rounded-md bg-gray-600 px-3 py-2 mt-3 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Close
      </button>
    </div>
  );
};
const inputField = (
  id,
  label,
  fieldName,
  fieldType,
  fieldPlaceHolder,
  span,
  existData,
  handleChange,
  fieldValue
) => {
  if (fieldName === "start_time") {
    // alert(fieldValue)
    console.log(fieldName);
  }
  return (
    <div>
      <label className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className={`mt-2 grid grid-cols-${span}`}>
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
          <input
            name={fieldName}
            type={fieldType}
            placeholder={fieldPlaceHolder}
            value={fieldValue || existData}
            onChange={(e) => handleChange(e)}
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          />
        </div>
      </div>
    </div>
  );
};
const dropDown = (
  id,
  label,
  selectionName,
  placeholder,
  year,
  span,
  specialization,
  existData,
  handleChange,
  fieldValue
) => {
  let option;
  switch (id) {
    case "hall":
      option = lectureHall;
      break;
    case "lecture":
      option = getOptionByYear(year, specialization);
  }
  return (
    <div>
      <label className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className={`mt-2 grid grid-cols-${span}`}>
        <select
          name={selectionName}
          value={fieldValue || existData}
          onChange={(e) => handleChange(e)}
          // autoComplete={autoComplete}
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        >
          <option contentEditable={false} disabled={true}>
            {placeholder}
          </option>
          {option.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        {/* <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        /> */}
      </div>
    </div>
  );
};
const getOptionByYear = (year, specialization) => {
  switch (year) {
    case "year_1":
      return firstYearOption;
    case "year_2":
      return secondYearOption;
    case "year_3":
      if (specialization === "Software") {
        return softwareThirdYearOption;
      } else {
        return NetowkrThirdYearOption;
      }
    case "year_4":
      if (specialization === "Software") {
        return softwareFourthYearOption;
      } else {
        return NetowkrFourthYearOption;
      }
    default:
      return {};
  }
};
const secondYearOption = [
  "Data Structures and Algorithms",
  "Platform Technologiess",
  "Network Switching and Routing",
  "Digital Electronic Systems",
  "Object Oriented Analysis and Design",
  "Social and Professional Issues in ICT",
  "Practical for Data Structures and Algorithms ",
  "Practical for Platform Technologies",
  "Practical for Network Switching and Routing",
  "Practical for Digital Electronic Systems",
];
const softwareThirdYearOption = [
  "Software Engineering",
  "ICT Project Management",
  "Artificial Intelligence",
  "Software Verification and Quality Assurance",
  "Research Methodologies for ICT",
  "Practical for Artificial Intelligence",
  "Cryptography",
  "Data Mining",
  "Human Computer Interaction",
  "Practical for Cryptography",
  "Practical for Data Mining",
  "Practical for Human Computer Interaction",
];
const NetowkrThirdYearOption = [
  "Scaling and Connecting Network",
  "Cryptography",
  "Vulnerability Assessment and Penetration Testing-I",
  "Research Methodologies for ICT",
  "ICT Project Management",
  "Practical for Scaling and Connecting Network",
  "Practical for Cryptography",
  "Practical for Vulnerability Assessment and Penetration Testing-I",
];

const softwareFourthYearOption = [
  "Final Research and Development Project",
  "Advance Software Engineering",
  "Advance Database Management System",
  "Professional Practice",
  "Practical for Cloud Application Development",
  "Practical for Advance Database Management System",
  "Practical for Advance Software Engineering",
  "Data Analytics and Business Intelligence",
  "Introduction to Smart Systems",
  "Practical for Introduction to Smart Systems",
  "Risk, Crisis and Security Management",
];
const NetowkrFourthYearOption = [
  "CIS24212",
  "Industrial Automation and ladder Programming",
  "Computer security and forensics",
  "Vulnerability assessments and penetration testing-II",
  "Risk, Crisis and Security Management",
  "Final Research and Development Project",
  "Data Analytics and Business Intelligence",
  "Professional Practice",
  "Practical for Industrial Automation and ladder Programming",
  "Practical for Computer security and forensics",
  "Practical for vulnerability assessments and penetration testing-II",
  "Secure Network Infrastructure",
  "Practical for Secure Network Infrastructure",
  "Introduction to Smart Systems",
];
const firstYearOption = [
  "Essentials of ICT and PC Applications",
  "Fundamentals of Programming",
  "Logic designing and Computer Organization",
  "Mathematics for ICT",
  "English I",
  "Tamil Language(for Sinhala Speaking Students",
  "Sinhala Language(for Tamil Speaking Students",
  "Practical for Essentials of ICT and PC Applications",
  "Practical for Fundamentals of Programming",
  "Practical for Database Design",
];
const lectureHall = ["SWT", "LH5", "LH4", "NST", "CIS", "MLT", "WNT", "MAL"];
