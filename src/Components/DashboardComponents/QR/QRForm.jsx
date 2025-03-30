import React, { useEffect, useState } from "react";
import ErrorComponent from "../../Notification/ErrorComponent";
function QRForm({ setInitialize,setSubCode }) {


  const [data, setData] = useState({
    ac_year: "",
    batch: "",
    semester: "",
    dep: "",
    spec: "",
    lec: "",
    lectr: "",
  });
 
 
     
  
  let sub_c = data.lec.slice(0,8);
  const [error, setError] = useState("");

  const [options, setOptions] = useState([]);
  const handleOnChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!data?.ac_year) {
      setError("Academic Year Not Selected");
      return;
    }
    if (!data?.batch) {
      setError("Batch Not Selected");
      return;
    }
    if (!data?.semester) {
      setError("Semester Not Selected");
      return;
    }
    if (!data?.dep) {
      setError("Department Not Selected");
      return;
    }
    if (data.batch === "year_3" || data.batch === "year_4") {
      if (!data?.spec) {
        setError("Specialization Not Selected");
        return;
      }
    }
    if (!data?.lec) {
      setError("Lecture Not Selected");
      return;
    }
    if (!data?.lectr) {
      setError("Please fill the Lecturer Name");
      return;
    }
    if(data?.lec){
      
      setSubCode(sub_c)
    }

    setInitialize(true);
    localStorage.setItem("data", JSON.stringify(data));


    fetch('http://localhost:8000/api/qr_create',{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({id:sub_c})
    })
    .then(response=>response.json())
    .then(data=>{
    })
    .catch(error=>{
      alert(error)
    })
  };
  useEffect(() => {
    if (data.batch || data.spec || data.semester) {
      setOptions(getOptionByYear(data.batch, data.spec, data.semester));
    }
  }, [data]);

  return (
    <div className="space-y-0 border border-gray-300 rounded-lg ">
      <div className="border-b border-gray-900/10 pb-12">
        <div className=" flex  min-h-full flex-1 flex-col justify-center px-12 py-4 lg:px-8">
          <form className="max-w-sm mx-auto border-0 p-10 rounded-2xl shadow-2xl ">
            <div className="mb-5 ">
              <h1 className="text-center  text-3xl font-bold text-gray-900">
                Welocome Back
              </h1>
              <p className="text-center mb-4 text-sm/6 text-gray-600">
                Please Fill the below form to Generate QR Code
              </p>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Academic Year
              </label>
              <select
                name="ac_year"
                value={data.ac_year || "Choose Academic Year"}
                onChange={handleOnChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Choose Academic Year" disabled>
                  Choose Academic Year
                </option>
                <option value={"2020/2021"}>2019/2020</option>
                <option value={"2021/2022"}>2020/2021</option>
                <option value={"2022/2023"}>2021/2022</option>
                <option value={"2023/2024"}>2022/2023</option>
                <option value={"2024/2025"}>2023/2024</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Batch
              </label>
              <select
                name="batch"
                value={data.batch || "Choose Batch"}
                onChange={handleOnChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={"Choose Batch"} disabled>
                  Choose Batch
                </option>
                <option value={"year_1"}>1st Year</option>
                <option value={"year_2"}>2nd Year</option>
                <option value={"year_3"}>3rd Year</option>
                <option value={"year_4"}>4th Year</option>
              </select>
            </div>
            {/* this is for semester */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Semester
              </label>
              <select
                name="semester"
                value={data.semester || "Choose Semester"}
                onChange={handleOnChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Choose Semester" disabled>
                  Choose Semester
                </option>
                <option value="1st">1st Semester</option>
                <option value="2nd">2nd Semester</option>
              </select>
            </div>
            {/* this is for semester */}

            {/* this is for Somthing */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Department
              </label>
              <select
                name="dep"
                value={data.dep || "Choose Department"}
                onChange={handleOnChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Choose Department" disabled>
                  Choose Department
                </option>
                <option value="Department Of Information Communication Technology">
                  Information Communication Technology
                </option>
                <option value="Department Of Bio System Technology">
                  Bio System Technology
                </option>
              </select>
            </div>

            {data.batch === "year_3" || data.batch === "year_4" ? (
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Specialization
                </label>
                <select
                  name="spec"
                  value={data.spec || "Choose Specialization"}
                  onChange={handleOnChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="Choose Specialization" disabled>
                    Choose Specialization
                  </option>
                  <option value="Software">Software</option>
                  <option value="Network">Network</option>
                </select>
              </div>
            ) : null}

            {/* this is for something end */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Lecture
              </label>
              <select
                name="lec"
                value={data.lec || "Choose Lecture"}
                onChange={handleOnChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected>
                  Choose Lecture
                </option>

                {options.length > 0 ? (
                  options?.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))
                ) : (
                  <option disabled>Choose Lecture</option>
                )}
              </select>
            </div>
            {/* Department */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Lecturer
              </label>
              <input
                name="lectr"
                value={data.lectr}
                type="text"
                id="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Enter Lecturer Name"
                onChange={handleOnChange}
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto justify-center align-middle m-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
            {error ? (
              <ErrorComponent
                title={"Empty Field"}
                message={error ? error : ""}
              />
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default QRForm;
const getOptionByYear = (batch, specialization, semester) => {
  switch (batch) {
    case "year_1":
      if (semester === "1st") {
        return firstYear_firstSem;
      } else if (semester === "2nd") {
        return firstYear_secondSem;
      } else {
        return empty;
      }
    case "year_2":
      if (semester === "1st") {
        return secondYear_firstSem;
      } else if (semester === "2nd") {
        return secondYear_secondSem;
      } else {
        return empty;
      }
    case "year_3":
      if (specialization === "Software") {
        if (semester === "1st") {
          return thirdYear_firstSem;
        } else if (semester === "2nd") {
          return thirdYear_secondSem;
        } else {
          return empty;
        }
      } else {
        if (semester === "1st") {
          return thirdYear_firstSem;
        } else if (semester === "2nd") {
          return thirdYear_secondSem;
        } else {
          return empty;
        }
      }
    case "year_4":
      if (specialization === "Software") {
        if (semester === "1st") {
          return forthYear_firstSem;
        } else if (semester === "2nd") {
          return forthYear_secondSem;
        } else {
          return empty;
        }
      } else {
        if (semester === "1st") {
          return forthYear_secondSem;
        } else if (semester === "2nd") {
          return forthYear_secondSem;
        } else {
          return empty;
        }
      }
    default:
      return empty;
  }
};
const empty = [];
const firstYear_firstSem = [
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
const firstYear_secondSem = [
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
const secondYear_firstSem = [
  "Scaling and Connecting Network",
  "Cryptography",
  "Vulnerability Assessment and Penetration Testing-I",
  "Research Methodologies for ICT",
  "ICT Project Management",
  "Practical for Scaling and Connecting Network",
  "Practical for Cryptography",
  "Practical for Vulnerability Assessment and Penetration Testing-I",
];

const secondYear_secondSem = [
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
const thirdYear_firstSem = [
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
const thirdYear_secondSem = [
  "CIS20220 Essentials of ICT and PC Applications",
  "CIS20221 Fundamentals of Programming",
  "CIS20222 Logic designing and Computer Organization",
  "Mathematics for ICT",
  "English I",
  "Tamil Language(for Sinhala Speaking Students",
  "Sinhala Language(for Tamil Speaking Students",
  "Practical for Essentials of ICT and PC Applications",
  "Practical for Fundamentals of Programming",
  "Practical for Database Design",
];
const forthYear_firstSem = [
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
const forthYear_secondSem = [
  "Scaling and Connecting Network",
  "Cryptography",
  "Vulnerability Assessment and Penetration Testing-I",
  "Research Methodologies for ICT",
  "ICT Project Management",
  "Practical for Scaling and Connecting Network",
  "Practical for Cryptography",
  "Practical for Vulnerability Assessment and Penetration Testing-I",
];
