import React, { useEffect } from "react";

function Loader({
  primaryText,
  secondaryText,
  loaderColor,
  innerPadding,
  outterPadding,
  tolerance,
  enable,
  LoaderEnable,
  setLoaderEnable,
}) {
  useEffect(() => {
    if (enable) {
      setTimeout(() => {
        setLoaderEnable(false);
      }, [5000]);
    }
    return () => clearTimeout();
  }, []);
  return (
    <>
      {enable ? (
        <div className="relative text-center z-[-1]">
          <div className="flex justify-center flex-col text-gray-500">
            <div>{primaryText}</div>
            <div>{secondaryText}</div>
          </div>
          <div className="relative flex justify-center w-full rot-360 py-3">
            <div
              className={`relative p-${innerPadding} ${loaderColor} rounded-full z-0`}
            ></div>
            <div
              className={`absolute p-${outterPadding}  bg-white rounded-full z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            ></div>
            <div
              className={`absolute p-${tolerance}  bg-white z-50  left-1/2 -translate-x-1/2`}
            ></div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Loader;
