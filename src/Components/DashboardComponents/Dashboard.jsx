import { useContext } from "react";
import { useAppContext } from "../AppContext/AppContext";
import { AuthContext } from "../AppContext/AuthContext";
import Card from "../Common/Card";
import DashboardCards from "./DashboardCards";
import Gemini from "./Gemini";
import QrGenerator from "./QR/QrGenerator";
import QrScanner from "./QR/QrScanner";
import Sidebar from "./Sidebar";
import SummaryProfile from "./SummaryProfile";
// const stats = [
//   { id: 1, name: "Transactions every 24 hours", value: "44 million" },
//   { id: 2, name: "Assets under holding", value: "$119 trillion" },
//   { id: 3, name: "New users annually", value: "46,000" },
// ];
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {/* <Breadcrumb/> */}
      <div className="mx-5 sm:ml-10">
        {/* <Sidebar /> */}
        <div className="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-1  gap-5 mb-2">
            <Card />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-2">
            {/* <Gemini />
            <QrScanner /> */}
            <DashboardCards
              account_type={user?.account_type}
              identy={"ai"}
              description={
                "Ask AI Assistance for help with this web application and its usage."
              }
              content={"Ask From AI"}
            />
            <DashboardCards
              account_type={user?.account_type}
              label={"Qr Scan"}
              identy={"scanner"}
              description={
                "Students can submit attendance by scanning the QR code given by the lecturer."
              }
              content={"Submit Attendance"}
            />
            {user?.account_type === "Lecturer" ? (
              <DashboardCards
                account_type={user?.account_type}
                disable={true}
                label={
                  user?.account_type === "Lecturer" ? "Qr Gen" : "Not Available"
                }
                identy={"generator"}
                description={
                  "Lecture can generete and display the QR Code to get the student attendance"
                }
                content={"Generate QR Code"}
              />
            ) : null}
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
      </div> */}
      {/* <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div> */}
      {/* <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div> */}
      {/* <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
};
export default Dashboard;
