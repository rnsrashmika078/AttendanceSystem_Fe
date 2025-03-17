import React, { useEffect, useState } from "react";

function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine); //Get Online or offline status

  useEffect(() => {
    const handleOnline = () => {setIsOnline(true)};
    const handleOffline = () => {setIsOnline(false)};

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);


  return (
    <div>
      {isOnline ? (
        <p className="bg-green-500 border border-gray-300 rounded-full shadow-2xl shadow-amber-600 w-6 text-transparent">!</p>
      ) : (
        <p className="bg-red-500 border border-gray-300 rounded-full shadow-2xl shadow-amber-600 w-6 text-transparent">!</p>
      )}
    </div>
  );
}

export default NetworkStatus;
