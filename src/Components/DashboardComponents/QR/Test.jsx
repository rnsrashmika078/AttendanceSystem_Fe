import React, { useRef } from "react";


const Test = () => {
  const updatedQrRecordHistory = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/create_qr_record",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ sub_code: "CIS20220", status: "Finished" }),
        }
      );

      if (!response.ok) {
        throw new Error("Error while getting response from !");
      }
      const data = await response.json();
      if (data) {
        alert(JSON.stringify(data))
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="text-[rgb(255,0,0)] text-2xl">
      <h1>HI HI HI </h1>
      <button onClick={updatedQrRecordHistory}>GENEREATE PDF</button>
    </div>
  );
};

export default Test;
