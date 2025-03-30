import { useEffect, useState } from "react";
import EventAddModalNew from "../DashboardComponents/EventAddModalNew";
import Add from "../Notification/Add";
import Delete from "../Notification/Delete";
import { useAppContext } from "../AppContext/AppContext";
import Warning from "../Notification/Warning";
export default function Card() {
  const { messageBody  } = useAppContext();
  // fetch data from the api
  const [fetchData, setFetchData] = useState([]);
  const [editData, setEditData] = useState([]);

  //related to the notifiers
  const [NotifierVisibility, setNotifierVisibility] = useState(false);
  const [messageType, setMessageType] = useState("default");

  // related states for Days
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [currentDay, setCurrentDay] = useState("Monday");
  const [indexDay, setIndexDay] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);

  // Studies Year
  const [studyYear, setStudyYear] = useState("year_1");

  //Modal
  const [modalVisibility, setModalVisibility] = useState(false);

  //Notifiers
  const HandleNotifiers = (visibility, messageType) => {
    setNotifierVisibility(visibility);
    setMessageType(messageType);
    setTimeout(() => {
      setMessageType(null);
      setNotifierVisibility(!visibility);
    }, 5000);
  };
  const CurrentPage = () => {
    switch (indexDay) {
      case 0:
        setStart(0);
        setEnd(4);
        break;
      case 1:
        setStart(4);
        setEnd(8);
        break;
      case 2:
        setStart(8);
        setEnd(12);
        break;
      case 3:
        setStart(12);
        setEnd(16);
        break;
      case 4:
        setStart(16);
        setEnd(20);
        break;
    }
  };

  const fetchAllData = async () => {
    await fetch("http://localhost:8000/api/get", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFetchData(data.data);
      })
      .catch((error) => {
        alert(error)
      });
  };

  const handleMoveLeft = () => {
    let index = indexDay + 1;
    if (index > 4) {
      index = 0;
    }
    setIndexDay(index);
    setCurrentDay([days[index]]);
    CurrentPage();
  };
  const handleMoveRight = () => {
    let index = indexDay - 1;
    if (index < 0) {
      index = days.length - 1;
    }
    setIndexDay(index);
    setCurrentDay([days[index]]);
    CurrentPage();
  };

  const handleCardClick = (item) => {
    setModalVisibility(true);
    setEditData(item);
  };

  //refresh data
  useEffect(() => {
    fetchAllData();
    CurrentPage();
  }, [indexDay]);

  return (
    <div className="bg-gray-100 py-5">
      {NotifierVisibility &&
        (messageType === "add" ? (
          <Add
            setNotifierVisibility={setNotifierVisibility}
            messageBody={messageBody}
          />
        ) : messageType === "delete" ? (
          <Delete
            setNotifierVisibility={setNotifierVisibility}
            messageBody={messageBody}
          />
        ) : messageType === "warning" ? (
          <Warning
            setNotifierVisibility={setNotifierVisibility}
            messageBody={messageBody}
          />
        ) : null)}

      {modalVisibility ? (
        <EventAddModalNew
          studyYear={studyYear}
          setModalVisibility={setModalVisibility}
          editData={editData}
          editItemId={JSON.stringify(editData.id)}
          fetchAllData={fetchAllData}
          HandleNotifier={HandleNotifiers}
          currentDay={currentDay}
        />
      ) : null}
      {currentDate()}
      {DaySelection(handleMoveLeft, handleMoveRight, currentDay)}
      {YearSelection(setStudyYear, studyYear)}
      {Cards(fetchData, start, end, studyYear, handleCardClick)}
    </div>
  );
}
const Cards = (fetchData, start, end, studyYear, handleCardClick) => {
  return (
    <div className="w-full p-2 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-11/12">
        {fetchData.slice(start, end).map((item, index) => (
          <div
            onClick={() => handleCardClick(item)}
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 transition-all border border-transparent hover:shadow-xl border-l-4 border-r-4 hover:scale-105 hover:border-blue-500"
          >
            <h2 className="text-m font-bold text-gray-900 transform-all duration-300 hover:text-2xl">
              {item[`${studyYear}_lecture`]}
            </h2>
            <h3 className="text-xs text-gray-600 font-semibold transform-all duration-300 hover:text-2xl">
              {item[`${studyYear}_lecturer`]}
            </h3>
            <p className="text-gray-500 transform-all text-xs duration-300 hover:text-2xl">
              {item[`${studyYear}_lecture_hall`]}
            </p>
            <div className="mt-4 transition-all hover">
              <p className="text-blue-500 text-lg font-bold transform-all duration-300 hover:text-2xl">
                {formatTime(item.start_time, item.end_time)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const YearSelection = (setStudyYear, studyYear) => {
  return (
    <div className="w-1/4 justify-center m-auto ">
      <ul
        className="flex justify-center flex-wrap text-xs font-lighter text-center text-gray-950 border-b-1 dark:border-gray-700 dark:text-dark "
        id="defaultTab"
        data-tabs-toggle="#defaultTabContent"
        role="tablist"
      >
        <li className="me-2">
          <button
            onClick={() => setStudyYear("year_1")}
            id="about-tab"
            data-tabs-target="#about"
            type="button"
            role="tab"
            aria-controls="about"
            aria-selected="true"
            className={
              studyYear === "year_1"
                ? "inline-block p-4 text-blue-600 font-bold hover:bg-gray-100 dark:text-blue-500"
                : "inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            }
          >
            1st Year
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setStudyYear("year_2")}
            id="services-tab"
            data-tabs-target="#services"
            type="button"
            role="tab"
            aria-controls="services"
            aria-selected="false"
            className={
              studyYear === "year_2"
                ? "inline-block p-4 text-blue-600 font-bold hover:bg-gray-100 dark:text-blue-500"
                : "inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            }
          >
            2nd Year
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setStudyYear("year_3")}
            id="statistics-tab"
            data-tabs-target="#statistics"
            type="button"
            role="tab"
            aria-controls="statistics"
            aria-selected="false"
            className={
              studyYear === "year_3"
                ? "inline-block p-4 text-blue-600 font-bold hover:bg-gray-100 dark:text-blue-500"
                : "inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            }
          >
            3rd Year
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setStudyYear("year_4")}
            id="statistics-tab"
            data-tabs-target="#statistics"
            type="button"
            role="tab"
            aria-controls="statistics"
            aria-selected="false"
            className={
              studyYear === "year_4"
                ? "inline-block p-4 text-blue-600 font-bold hover:bg-gray-100 dark:text-blue-500"
                : "inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            }
          >
            4th Year
          </button>
        </li>
      </ul>
    </div>
  );
};

const DaySelection = (handleMoveLeft, handleMoveRight, currentDay) => {
  return (
    <div className="bg-gray-100 flex display-flex align-center justify-center gap-10 text-center">
      <div>
        <button
          onClick={handleMoveRight}
          className="hover hover:cursor-pointer hover hover:border-transparent rounded-2xl hover:scale-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <div className="text-xl font-bold mb-1">{currentDay}</div>
      <div>
        <button
          onClick={handleMoveLeft}
          className="hover hover:cursor-pointer hover hover:border-transparent rounded-2xl hover:scale-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const currentDate = () => {
  const today = new Date();
  let sliceDate = today.toLocaleDateString().slice(2, 9);
  return (
    <div className="text-center b-4">
      <p>{sliceDate}</p>
    </div>
  );
};

const formatTime = (startTime, endTime) => {
  const [startHours, startMinutes] = startTime
    .split(":")
    .map((time) => parseInt(time));

  const [endHours, endMinutes] = endTime
    .split(":")
    .map((time) => parseInt(time));

  let startMeridiam = startHours >= 12 ? "PM" : "AM";
  let formattedStartHour = startHours > 12 ? startHours - 12 : startHours;

  let endMeridiam = endHours >= 12 ? "PM" : "AM";
  let formattedEndHour = endHours > 12 ? endHours - 12 : endHours;


  return (
    <div>
      <div>
        {formattedStartHour}:
        {String(Math.abs(startMinutes)).length < 2
          ? "0" + startMinutes
          : startMinutes}{" "}
        {startMeridiam}
      </div>

      <div>
        {formattedEndHour}:
        {String(Math.abs(endMinutes)).length < 2
          ? "0" + endMinutes
          : endMinutes}{" "}
        {endMeridiam}
      </div>
    </div>
  );
};
