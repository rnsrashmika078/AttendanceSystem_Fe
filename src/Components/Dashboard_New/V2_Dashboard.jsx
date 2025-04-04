import React, { useEffect, useState } from "react";
import DashboardCards from "../DashboardComponents/DashboardCards";


const V2_Dashboard = () => {
  const [width, setWidth] = useState();
  const [toggle, setToggle] = useState(false);
  const [tailwindSize, setTailwindSize] = useState("");
  const handleToggleSidePanel = () => {
    setToggle((prev) => !prev);
  };

  const handleChangeTheme = () => {
    alert("YES")
  };

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);

      if (newWidth >= 1280) {
        setTailwindSize("xl");
      } else if (newWidth >= 1024) {
        setTailwindSize("lg");
      } else if (newWidth >= 768) {
        setTailwindSize("md");
      } else if (newWidth >= 640) {
        setTailwindSize("sm");
      } else {
        setTailwindSize("");
      }
    };

    // Run initially to set the correct size on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          toggle ? "ml-38 md:ml-50 lg:ml-50 xl:ml-60" : ""
        }`}
      >
        <div className="p-5 bg-transparent shadow-2xl border-1 border-gray-200 ">
          <h1 className="text-3xl font-bold ">
            <SearchBar handleChangeTheme={handleChangeTheme}/>
          </h1>
        </div>

        <p>
          {/* <div className="">
            Here is the content of your dashboard. When the panel is open, the
            content will be pushed to the right.
          </div> */}
        </p>
        <div className="w-full sm:w-full md:w-full lg:w-full xl:w-full">
          <div className="relative h-screen bg-grape px-7  shadow-2xl">
            <button
              onClick={handleToggleSidePanel}
              className={`fixed top-1/2 left-0 ${
                toggle
                  ? "w-70 sm:w-41 md:w-51 lg:w-51 xl:w-61"
                  : "w-66 md:w-73 lg:w-81"
              }  bg-gray-800 text-white transform ${
                toggle
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
                  strokeWidth={1.5}
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
            <div
              className={`fixed top-0 left-0 w-40 sm:w-40 md:w-50 lg:w-50 xl:w-60 h-full bg-gray-800 text-white transform ${
                toggle ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out z-20`}
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold">Dashboard</h2>
                <ul className="mt-4">
                  <li>
                    <a className="block py-2 px-4 hover:bg-gray-700">Home</a>
                  </li>
                  <li>
                    <a className="block py-2 px-4 hover:bg-gray-700">Profile</a>
                  </li>
                  <li>
                    <a className="block py-2 px-4 hover:bg-gray-700">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="block py-2 px-4 hover:bg-gray-700">Logout</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="py-5 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense">
              <div className="col-1  sm:col-1 xl:col-1 md:-col-3 lg:col-1">
                <div className="border-1 border-gray-200 shadow-xs bg-white rounded-2xl p-2 w-auto h-50">
                  <div className="bg-gray-200 w-1/3 p-3  place-items-center rounded-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    User {width} {tailwindSize}
                  </div>
                </div>
              </div>

              <div className="col-1  sm:col-2 xl:col-2 md:-col-2 lg:col-2">
                <div className="border-1 border-gray-200 shadow-xs bg-white rounded-2xl p-2 w-auto h-50">
                  <div className="bg-gray-200 w-1/3 p-3  place-items-center rounded-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>
                  </div>
                  <div>Student</div>
                </div>
              </div>
              <div className="xl:col-span-2 sm:col-span-2 grid-cols-span-2 md:col-span-2  lg:col-span-2">
                <div className="border-1 border-gray-200 shadow-xs bg-white rounded-2xl p-2 w-auto h-50 ">
                  <div className="bg-gray-200 w-1/3 p-3  place-items-center rounded-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>
                  </div>
                  <div>Admin</div>
                </div>
              </div>
              <div className="col-1 row-span-2  sm:col-span-2 sm:row-span-1 xl:col-3 xl:row-span-2 md:col-span-2 lg:col-3 lg:row-span-2">
                <div className="border-1 border-gray-200 shadow-xs bg-white rounded-2xl p-2 w-auto h-103">
                  <div className="bg-gray-200 w-1/3 p-3  place-items-center rounded-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>
                  </div>
                  <div>Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default V2_Dashboard;

const SearchBar = ({handleChangeTheme}) => {
  return (
    <div className="relative ">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <div className="flex justify-between">
        <input
          type="search"
          id="default-search"
          className="block w-1/3 p-2 ps-10 text-sm placeholder:font-light text-gray-900 border border-gray-300 rounded-lg"
          placeholder="Search or type command..."
          required
        />

        <div className="flex gap-5 ">
          <button
            onClick={handleChangeTheme}
            className="bg-white border-1 hover:cursor-pointer  border-gray-300 p-2 rounded-4xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </button>
          <button className="hover:cursor-pointer bg-white border-1 border-gray-300 p-2 rounded-4xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
              />
            </svg>
          </button>
          <div className="flex gap-2 place-items-center hover:cursor-pointer">
            <button className="bg-white border-1 hover:cursor-pointer border-gray-300 p-2 rounded-4xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </button>
            <p className="text-sm flex flex-col font-light ">Rashmika</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
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
  );
};
