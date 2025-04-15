import { tail, toLower } from "lodash";
import React, { useEffect, useState } from "react";
import { schedule } from "../DataSets/schedule";
import {
  setWidth,
  setToggle,
  setIsDarkMode,
  setTailWindSize,
  setActiveItem,
  setNextCard,
} from "../ReduxState/CommonSlicer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import BarChart from "../DashboardComponents/Charts/BarChart";
import LineChart from "../DashboardComponents/Charts/LineChart";
const V2_Dashboard = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.dashboard);
  const [openItem, setOpenItem] = useState(false);

  const handleClickNextCard = () => {
    dispatch(setNextCard(state.nextCard + 1));
    if (state.nextCard >= 3) {
      dispatch(setNextCard(1));
    }
  };

  // useEffect(() => {
  //   console.log(state.nextCard);
  // }, [state.isOnline, navigator, state.nextCard]);

  const handleToggleSidePanel = () => {
    setOpenItem(null);
    dispatch(setToggle(!state.toggle));
  };

  const handleShowDropDowns = (e) => {
    const clickedItem = e.currentTarget.id;
    dispatch(setActiveItem(e.currentTarget.id));
    setOpenItem((prev) => (prev === clickedItem ? null : clickedItem));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!state.isDarkMode));
    if (!state.isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      dispatch(setIsDarkMode(true));
      document.body.classList.add("dark");
    } else if (storedTheme === "light") {
      dispatch(setIsDarkMode(false));
      document.body.classList.add("light");
    } else {
      dispatch(setIsDarkMode(false));
      document.body.classList.add("light");
    }
  }, []);


  // dynamicly change card content over time
  useEffect(() => {
    const timeInteval = setInterval(() => {
      dispatch(setNextCard(state.nextCard + 1));
      if (state.nextCard >= 3) {
        dispatch(setNextCard(1));
      }
      console.log(state.nextCard);
    }, 4000);
    return () => clearInterval(timeInteval);
  });

  return (
    <div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          state.toggle ? "ml-0 sm:ml-0 md:ml-60 lg:ml-60 xl:ml-60" : ""
        }`}
      >
        <div className="bg-[rgb(var(--bg-color))] sticky top-0 z-50 p-3  border-b-1 border-b-[rgb(var(--border-color))] ">
          <h1 className="text-3xl font-bold ">
            <DashboardHeader
              toggleDarkMode={toggleDarkMode}
              handlesShowItem={handleShowDropDowns}
              openItem={openItem}
            />
          </h1>
        </div>
        <div
          className="w-full sm:w-full 
                      bg-[rgb(var(--existing-bg-color))]
                      md:w-full lg:w-full xl:w-full"
        >
          <div className="relative h-screen  px-7  shadow-2xl">
            <DashboardToggler handleToggleSidePanel={handleToggleSidePanel} />
            <SidePanel
              handlesShowItem={handleShowDropDowns}
              openItem={openItem}
            />

            <div className="py-5 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense">
              <div className="col-1  sm:col-1 xl:col-1 md:-col-3 lg:col-1 dashboard-scale">
                {" "}
                <div
                  className={`border-1 border-[rgb(var(--border-color))]  shadow-xs bg-[rgb(var(--card-bg-color))] rounded-2xl p-2 w-auto h-80`}
                >
                  <DashboardCard handleClickNextCard={handleClickNextCard} />
                </div>
              </div>
              <div className="col-1  sm:col-2 xl:col-2 md:-col-2 lg:col-2 dashboard-scale">
                {" "}
                <div
                  className={`border-1 border-[rgb(var(--border-color))]  shadow-xs bg-[rgb(var(--card-bg-color))] rounded-2xl p-2 w-auto h-80`}
                >
                  <DashboardCard_1 handleClickNextCard={handleClickNextCard} />
                </div>
              </div>
              <div className="xl:col-span-2 sm:col-span-2 grid-cols-span-2 md:col-span-2  lg:col-span-2 slide-from-left">
                <div
                  className={`border-1 border-[rgb(var(--border-color))]  shadow-xs bg-[rgb(var(--card-bg-color))] rounded-2xl p-2 w-auto h-full`}
                >
                  <LineChart />
                </div>
              </div>
              <div className="col-1 row-span-2  sm:col-span-2 sm:row-span-1 xl:col-3 xl:row-span-2 md:col-span-2 lg:col-3 lg:row-span-2 slide-from-left">
                <div
                  className={`border-1 border-[rgb(var(--border-color))]  shadow-xs bg-[rgb(var(--card-bg-color))] rounded-2xl p-2 w-auto h-full`}
                >
                  <BarChart />
                </div>
              </div>
            </div>
            {state.isOnline ? (
              <div className="bg-green-500 rounded-2xl w-5 m-auto text-green-500">
                .
              </div>
            ) : (
              <div className="bg-red-500 rounded-2xl w-5 m-auto text-red-500 ">
                .
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default V2_Dashboard;

const DashboardHeader = ({ toggleDarkMode, handlesShowItem, openItem }) => {
  const state = useSelector((store) => store.dashboard);
  return (
    <div className={`relative`}>
      <div className="absolute hidden sm:hidden lg:block xl:block md:block inset-y-3 start-0 block items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-[rgb(var( --icon-foreground-color))]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <div className="flex justify-between">
        <div className="block sm:block lg:hidden xl:hidden md:hidden">
          <Logo />
        </div>
        <input
          type="search"
          className="sm:hidden lg:block xl:block md:block hidden w-1/3 p-2 ps-10 text-sm placeholder:font-light text-[rgb(var(--input-text))] border border-[rgb(var(--input-border))] bg-[rgb(var(--input-background))] rounded-lg"
          placeholder="Search or type command..."
          required
        />

        <div className="flex gap-5 place-items-center">
          {/* the button goes here brother */}
          <HeaderButton
            id={state.isDarkMode ? "darkTheme" : "lightTheme"}
            buttonFunction={toggleDarkMode}
          />
          <HeaderButton id={"alert"} />
          <div
            className="flex flex-row"
            id="authUser"
            onClick={handlesShowItem}
          >
            <HeaderButton id={"authUserAccount"} />
            {/* User name That showed as authenticated */}
            <div className="flex gap-2 place-items-center hover:cursor-pointer ">
              {/*Profile sub menu card show here */}
              <div>
                {openItem === "authUser" ? <UserProfileQuickActions /> : null}
              </div>
              <p className="text-sm flex flex-col font-light ">
                {state.width} {state.tailWindSize}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ handleClickNextCard }) => {
  const state = useSelector((store) => store.dashboard);
  return (
    <div
      className={`border-[rgb(var(--border-color))]  shadow-xs ${
        state.isDarkMode
          ? "bg-[rgb(var(--card-bg-color))]"
          : "bg-[rgba(100,100,100,0.06)]"
      } rounded-2xl p-2 w-auto h-full`}
    >
      <div className="bg-[rgb(var(--icon-bg-color))] w-20 p-4 place-items-center rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-calendar size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
          <path d="M16 3v4" />
          <path d="M8 3v4" />
          <path d="M4 11h16" />
          <path d="M11 15h1" />
          <path d="M12 15v3" />
        </svg>
      </div>
      <div className="py-5">
        <div className="">
          <p className="text-[rgb(var(--card-text-color-1))]  text-xl font-bold">
            Today Lectures
          </p>{" "}
          <p className="text-[rgb(var(--secondary))]  text-sm font-extralight">
            {new Date().toLocaleString("default", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex justify-between ">
          <div key={state.nextCard} className="slide-from-left py-2 gap-2">
            <div className="text-4xl font-display">
              {
                schedule.first_year.monday[`subjects_0${state.nextCard}`]
                  ?.sub_code
              }
            </div>
            <div className="text-[1rem] font-light text-amber-600">
              {
                schedule.first_year.monday[`subjects_0${state.nextCard}`]
                  ?.subject
              }
            </div>{" "}
            <div
              className={`text-xl font-extralight ${
                state.isDarkMode ? "text-amber-500" : "text-red-500"
              }`}
            >
              <div>
                {
                  schedule.first_year.monday[`subjects_0${state.nextCard}`]
                    ?.start_time
                }
              </div>
              <div>
                {
                  schedule.first_year.monday[`subjects_0${state.nextCard}`]
                    ?.end_time
                }
              </div>
            </div>
          </div>
          <div
            className="py-5 place-items-center hover:cursor-pointer"
            onClick={handleClickNextCard}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
const DashboardCard_1 = ({ handleClickNextCard }) => {
  const state = useSelector((store) => store.dashboard);
  return (
    <div
      className={`border-[rgb(var(--border-color))]  shadow-xs ${
        state.isDarkMode
          ? "bg-[rgb(var(--card-bg-color))]"
          : "bg-[rgba(100,100,100,0.06)]"
      } rounded-2xl p-2 w-auto h-full`}
    >
      <div className="bg-[rgb(var(--icon-bg-color))] w-20 p-4 place-items-center rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-calendar size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
          <path d="M16 3v4" />
          <path d="M8 3v4" />
          <path d="M4 11h16" />
          <path d="M11 15h1" />
          <path d="M12 15v3" />
        </svg>
      </div>
      <div className="py-5">
        <div className="">
          <p className="text-[rgb(var(--card-text-color-1))]  text-xl font-bold">
            Attendance Status
          </p>{" "}
          <p className="text-[rgb(var(--secondary))]  text-sm font-extralight">
            Today Lecture
          </p>
        </div>

        <div className="flex justify-between ">
          <div key={state.nextCard} className="slide-from-left py-2 gap-2">
            <div className="text-4xl font-display">
              {
                schedule.first_year.monday[`subjects_0${state.nextCard}`]
                  ?.sub_code
              }
            </div>
            <div className="text-[1rem] font-light text-amber-600">
              {
                schedule.first_year.monday[`subjects_0${state.nextCard}`]
                  ?.subject
              }
            </div>{" "}
            <div
              className={`text-xl font-extralight ${
                state.isDarkMode ? "text-amber-500" : "text-red-500"
              }`}
            >
              <div>
                {
                  schedule.first_year.monday[`subjects_0${state.nextCard}`]
                    ?.start_time
                }
              </div>
              <div>
                {
                  schedule.first_year.monday[`subjects_0${state.nextCard}`]
                    ?.end_time
                }
              </div>
            </div>
          </div>
          <div
            className="py-5 place-items-center hover:cursor-pointer"
            onClick={handleClickNextCard}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
const DashboardToggler = ({ handleToggleSidePanel }) => {
  const state = useSelector((store) => store.dashboard);

  return (
    <div>
      <button
        onClick={handleToggleSidePanel}
        className={`fixed top-1/2 left-0 ${
          state.toggle
            ? "w-90 sm:w-61 md:w-61 lg:w-61 xl:w-61"
            : "w-66 md:w-73 lg:w-81"
        }  bg-[rgb(var(--toggle-bg-color))] text-[rgb(var(--icon-foreground-color))] transform ${
          state.toggle
            ? "-translate-x-24 md:translate-x-5 sm:translate-x-5 xl:translate-x-5 lg:translate-x-5"
            : "-translate-x-60 md:-translate-x-67 sm:-translate-x-60 xl:-translate-x-75 lg:-translate-x-75"
        } transition-transform duration-300 ease-in-out z-20
              hover:scale-110 rounded-2xl 
            `}
      >
        <div className="place-items-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6 place-items-end"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};
const SidePanel = ({ handlesShowItem, dashboardSubItems, openItem }) => {
  const state = useSelector((store) => store.dashboard);

  return (
    <div className="relative">
      <div
        className={`fixed top-0 left-0 w-60 h-full bg-[rgb(var(--bg-color))] text-[rgb(var(--text))] transform ${
          state.toggle ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20 border-r-1 border-[rgb(var(--border-color))] overflow-y-auto scrollbar-hidden`}
      >
        <div className="p-5">
          {/* Logo goes here this is the side bar logo */}
          <Logo />
          <div className="mb-2">
            <ul className="mt-8">
              <p className="font-bold ">Menu</p>
              <div className="p-1 border-b-1 border-[rgb(var(--border-color))]"></div>
              <ListItem
                name="Dashboard"
                handleShowDropDowns={handlesShowItem}
                openItem={state.activeItem === "Dashboard" ? openItem : null}
              />{" "}
              <ListItem
                name="Calendar"
                handleShowDropDowns={handlesShowItem}
                openItem={state.activeItem === "Calendar" ? openItem : null}
              />{" "}
              <ListItem
                name="User Profile"
                handleShowDropDowns={handlesShowItem}
                openItem={state.activeItem === "User Profile" ? openItem : null}
              />{" "}
              <ListItem
                name="Task"
                handleShowDropDowns={handlesShowItem}
                openItem={state.activeItem === "Task" ? openItem : null}
              />{" "}
              <ListItem
                name="Form"
                handleShowDropDowns={handlesShowItem}
                openItem={state.activeItem === "Form" ? openItem : null}
              />{" "}
              <ListItem
                name="Tables"
                handleShowDropDowns={handlesShowItem}
                openItem={state.activeItem === "Tables" ? openItem : null}
              />{" "}
              <ListItem
                name="Pages"
                handleShowDropDowns={handlesShowItem}
                openItem={state.activeItem === "Pages" ? openItem : null}
              />
            </ul>
          </div>
          <div className="mb-2">
            <ul className="mt-5">
              <p className="font-bold ">Support</p>
              <div className="p-1 border-b-1 border-[rgb(var(--border-color))]"></div>
              <ListItem name="Chat" handleShowDropDowns={handlesShowItem} />
              <ListItem name="Email" handleShowDropDowns={handlesShowItem} />
              <ListItem name="Invoice" handleShowDropDowns={handlesShowItem} />
            </ul>
          </div>

          <div className="mb-2">
            <ul className="mt-5">
              <p className="font-bold ">Other</p>
              <div className="p-1 border-b-1 border-[rgb(var(--border-color))]"></div>
              <ListItem name="Charts" handleShowDropDowns={handlesShowItem} />
              <ListItem
                name="UI Elements"
                handleShowDropDowns={handlesShowItem}
              />
              <ListItem
                name="authentication"
                handleShowDropDowns={handlesShowItem}
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="flex flex-col gap-2 place-items-center lg:flex-row xl:flex-row md:flex-row ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 418 512.098"
        className="size-12 lg:size-15 xl:size-15 md:size-15 sm:size-12"
      >
        <path
          fill="#E37E00"
          d="M338.162 0l-3.226 5.303-44.592 73.121H127.443L79.838.004z"
        />
        <path
          fill="#F60"
          d="M341.642 0L418 95.776l-89.519 153.682c-22.587-25.893-53.454-44.369-88.471-51.317L338.417 5.303l-.772 1.264L341.267 0h.375z"
        />
        <path
          fill="#D0401B"
          d="M89.487 249.494L0 95.776 76.012.004h.242L82.8 11.187l-1.348-2.221 96.757 189.133c-35.123 6.917-66.085 25.43-88.722 51.395z"
        />
        <circle fill="#F5C800" cx="209" cy="353.598" r="158.499" />
        <path
          fill="#FFDD61"
          d="M209.112 233.909c65.819 0 119.182 53.35 119.182 119.182 0 65.837-53.363 119.201-119.182 119.201-65.83 0-119.192-53.364-119.192-119.201 0-65.828 53.362-119.182 119.192-119.182z"
        />
        <path
          fill="#E37E00"
          fillRule="nonzero"
          d="M212.625 285.676l18.707 43.806 47.452 4.259a3.802 3.802 0 012.179 6.652v.002l-35.898 31.346 10.619 46.463a3.814 3.814 0 01-5.802 4.041l-40.775-24.379-40.905 24.456a3.808 3.808 0 01-5.667-4.118l-.004-.002 10.62-46.462-35.9-31.345a3.807 3.807 0 012.303-6.667l47.326-4.246 18.72-43.829a3.811 3.811 0 017.025.023z"
        />
      </svg>
      <div>
        <h2 className="hidden text-xs xl:text-xl xl:block lg:text-xl lg:block sm:text-sm sm:hidden md:text-sm md:block font-my">
          Ozone
        </h2>
      </div>
    </div>
  );
};
const ListItem = ({ handleShowDropDowns, name, dropDown, openItem }) => {
  const state = useSelector((store) => store.dashboard);

  return (
    <div className="py-2 text-[15px] font-display">
      <li id={name} onClick={handleShowDropDowns}>
        <div
          className={`flex hover:cursor-pointer ${
            state.activeItem === name
              ? "bg-[rgb(var(--dashboard-active-item-bg-color))]"
              : ""
          } active:text-black rounded-[5px] hover:bg-[rgb(var(--dashboard-hover-item-bg-color))]`}
        >
          <div className="flex justify-left place-items-center px-1">
            {IconItem(name)}
            <a className="block py-2 px-2 rounded-[5px] hover:rounded-[5px]">
              {name}
            </a>
            <div className="absolute right-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 hover:stroke-2 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </li>
      <div className="relative px-5 w-full mx-5">
        {openItem ? renderDropDownItem(state.activeItem) : null}
      </div>
    </div>
  );
};
function renderDropDownItem(activeItem) {
  const subItems = () => {
    switch (activeItem) {
      case "Dashboard": {
        const subItems = [
          "eCommerce",
          "Analytics",
          "Marketing",
          "CRM",
          "Stocks",
          "Saas",
        ];
        return subItems;
      }
      case "Calendar": {
        const subItems = [
          "Events",
          "Shedules",
          "Time Events",
          "Games",
          "Projects",
          "Stats",
        ];
        return subItems;
      }
    }
  };
  const subItemArray = subItems();
  return subItemArray && subItemArray.length > 0 ? (
    <div className="relative text-[(var())] text-[16px] ">
      <ul
        className={`${
          subItemArray.length > 0 ? "flex py-4 flex-col gap-2" : ""
        }`}
      >
        {subItemArray.length > 0
          ? subItemArray?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between hover:bg-[rgb(var(--dashboard-hover-item-bg-color))] hover:rounded-[5px]"
              >
                <li className="rounded-[5px] p-1">{item}</li>
                <p className="flex place-items-center bg-[rgba(255,25,25,0.13)]  text-[#ff0000] font-bold text-[11px] px-1 h-1/2 my-auto mx-2  rounded-[4px]">
                  New
                </p>
              </div>
            ))
          : null}
      </ul>
    </div>
  ) : null;
}
function IconItem(id) {
  switch (id) {
    case "Dashboard":
      return (
        <svg
          // dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
          ></path>
        </svg>
      );
      break;
    case "Calendar":
      return (
        <svg
          dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
          ></path>
        </svg>
      );
      break;

    case "User Profile":
      return (
        <svg
          dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          ></path>
        </svg>
      );
      break;
    case "Task":
      return (
        <svg
          dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
          ></path>
        </svg>
      );
      break;
    case "Form":
      return (
        <svg
          dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          ></path>
        </svg>
      );
      break;
    case "Tables":
      return (
        <svg
          dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
          ></path>
        </svg>
      );
      break;
    case "Pages":
      return (
        <svg
          dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          ></path>
        </svg>
      );
      break;
    case "Chat":
      return (
        <svg
          dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          ></path>
        </svg>
      );
      break;
    case "Email":
      return (
        <svg
          dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          ></path>
        </svg>
      );
      break;
    case "Invoice":
      return (
        <svg
          dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          ></path>
        </svg>
      );
      break;
    case "Charts":
      return (
        <svg
          dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
          ></path>
        </svg>
      );
      break;
    case "UI Elements":
      return (
        <svg
          dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg "
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
          ></path>
        </svg>
      );
      break;
    case "authentication":
      return (
        <svg
          dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
          ></path>
        </svg>
      );
      break;
    // Header button ICON SVGs
    case "darkTheme":
      return (
        <svg
          dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))] "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          ></path>
        </svg>
      );
      break;
    case "lightTheme":
      return (
        <svg
          dataSlot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ariaHidden="true"
          className="size-6 text-[rgb(var(--icon-foreground-color))] "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          ></path>
        </svg>
      );
      break;
    case "alert":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-[rgb(var(--icon-foreground-color))] "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
          />
        </svg>
      );
      break;
    case "account":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      );
      break;
    case "authUserAccount":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      );
      break;
    case "settings":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      );
      break;
    case "support":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      );
      break;
    case "editProfile":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-[rgb(var(--icon-foreground-color))]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      );
      break;
  }
}
const HeaderButton = ({ id, buttonFunction }) => {
  return (
    <button
      onClick={buttonFunction}
      className="bg-[rgb(var(--icon-bg-color))]  border-1 hover:cursor-pointer  border-[rgb(var(--border-color))]  p-2 rounded-full"
    >
      {IconItem(id)}
    </button>
  );
};

const UserProfileQuickActions = ({}) => {
  return (
    <div className="absolute top-17.5 sm:top-17.5 xl:top-14 lg:top-14 md:top-14 font-display text-[rgb(var(--text))] bg-[rgb(var(--bg-color))] right-0  border-2 border-[rgb(var(--border-color))] shadow-2xl rounded-[8px]">
      <div className="font-light p-5 border-b-2 border-[rgb(var(--border-color))] ">
        <p className="text-[16px] text-[rgb(var(--text))]">
          Rashmika Siriwardhana
        </p>
        <p className="text-[12px] text-[rgb(var(--secondary-text))]">
          rnsrashmika078@gmail.com
        </p>
      </div>
      <div className="text-[15px] list-none text-left p-3">
        <li className="py-1 hover:bg-[rgb(var(--dashboard-hover-item-bg-color))] rounded-[5px] px-1">
          <div className="flex flex-row gap-2 place-items-center">
            {IconItem("User Profile")} Edit Profile
          </div>
        </li>
        <li className="py-1 hover:bg-[rgb(var(--dashboard-hover-item-bg-color))] rounded-[5px] px-1">
          <div className="flex flex-row gap-2 place-items-center">
            {IconItem("Invoice")} Account Settings
          </div>
        </li>
        <li className="py-1 hover:bg-[rgb(var(--dashboard-hover-item-bg-color))] rounded-[5px] px-1">
          <div className="flex flex-row gap-2 place-items-center">
            {IconItem("Calendar")} Support
          </div>
        </li>
        <div className=" my-3 border-b-2 border-[rgb(var(--border-color))]" />

        <div className="text-[15px] list-none text-left">
          <li className="py-1 hover:bg-[rgb(var(--dashboard-hover-item-bg-color))] rounded-[5px] px-1">
            <div className="flex flex-row gap-2 place-items-center">
              {IconItem("Dashboard")} Edit Profile
            </div>
          </li>
        </div>
      </div>
    </div>
  );
};
