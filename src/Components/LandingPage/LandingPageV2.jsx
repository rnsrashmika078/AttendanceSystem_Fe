import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const LandingPageV2 = () => {
  return (
    <div className="bg-white transition-all">
      <div className="relative isolate px-6 pt-0 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        ></div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-40">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="slide-from-top relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Get to know about this platform.{" "}
              <a href="#" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="slide-from-top text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              University Attendance System
            </h1>
            <p className="slide-from-left mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              keep attendance record, tracking , analyzing the data in realtime
            </p>
            <div className="slide-from-right mt-10 flex items-center justify-center gap-x-6">
              <Link to="/login">
                <button className="transform hover:scale-110 transition duration-300 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Get Started
                </button>
              </Link>
              <a
                href="#"
                className="text-sm/6 font-semibold
               text-gray-900
               transform hover:scale-110 transition duration-300"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        ></div>
      </div>
    </div>
  );
};
export default LandingPageV2;
