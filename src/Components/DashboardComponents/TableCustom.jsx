import React, { useEffect, useState } from "react";
import SubjectContent from "./SubjectContent";
import TimeContent from "./EventCard";
import Modal from "./EventAddModal";
import EventCard from "./EventCard";
import { Navigate } from "react-router-dom";

function TableCustom() {
  const [modalType, setModalType] = useState("");
  const [lectureSlot, setLectureSlot] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);

  const [addEvent, setAddEvent] = useState(false);
  const [timeRangeData, setTimeRangeData] = useState("");

  const handleOpenCloseAddEvent = (e) => {
    const { name, id } = e.currentTarget;
    if (name === "close") {
      setAddEvent(false);
    } else {
      if (!timeRangeData) {
        setAddEvent(true);
      } else {
        setAddEvent(true);
      }
    }
    if (id === "time_range") {
      setModalType(1);
    } else {
      setModalType(2);
    }
  };
  const handleAddTimeRange = (data) => {
    if (data) {
      setAddEvent(false);
      setTimeRangeData(data);
      fetch('http://localhost:8000/api/timeslot_event_create',{
        method:"POST",
        headers: {
          'Content-Type': 'application/json' // Correct header key
      },
        body:JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data=>{
         if(data.success){
            window.location.reload()//tempory till found the solution
         }
      })
      .catch(error=>{
        alert(error)
      })
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/timeslot_get_all", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        setTimeSlot(data.timeslots);
        console.log(data.timeslots)
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/api/lecture_get_all", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        setLectureSlot(data.lectureSlot);
        console.log(data.lectureSlot)
        // alert(JSON.stringify(data.timeslots))
        // alert(data.message);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  return (
    <> 
      <div>
        {addEvent ? (
          <Modal
            identifer={modalType}
            handleOpenCloseAddEvent={handleOpenCloseAddEvent}
            handleAddTimeRange={handleAddTimeRange}
          />
        ) : null}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm max-w-screen-sm">
          <thead className="font-serif">
            <tr>
              <th className="border border-gray-300 px-4 py-1" rowSpan={2}>
                Time
              </th>
              <th className="border border-gray-300 px-4 py-1" colSpan={4}>
                Monday
              </th>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-1 ">1-1</th>
              <th className="border border-gray-300 px-4 py-1">2-1</th>
              <th className="border border-gray-300 px-4 py-1">3-1</th>
              <th className="border border-gray-300 px-4 py-1">4-1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-1">
                <EventCard
                  identifier={1}
                  first_content={timeSlot[0]?.start_time}
                  second_content={timeSlot[0]?.end_time}
                  handleOpenCloseAddEvent={handleOpenCloseAddEvent}
                  addEvent={addEvent}
                />
              </td>
              <td className="border border-gray-300 px-4 py-1">
                john@example.com
              </td>
              <td className="border border-gray-300 px-4 py-1">123-456-7890</td>
              <td className="border border-gray-300 px-4 py-1">123-456-7890</td>
              <td className="border border-gray-300 px-4 py-1">123-456-7890</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-1">
                <EventCard
                 identifier={1}
                  first_content={timeSlot[1]?.start_time}
                  second_content={timeSlot[1]?.end_time}
                  handleOpenCloseAddEvent={handleOpenCloseAddEvent}
                  addEvent={addEvent}
                />
              </td>
              <td className="border border-gray-300 px-4 py-1">
                john@example.com
              </td>
              <td className="border border-gray-300 px-4 py-1">123-456-7890</td>
              <td className="border border-gray-300 px-4 py-1">123-456-7890</td>
              <td className="border border-gray-300 px-4 py-1">123-456-7890</td>
            </tr>

            {/* Middle */}
            <tr>
              <td
                colSpan={5}
                className="border text-center border-gray-300 px-4 py-1"
              >
                LUNCH BREAK
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-1">
                <EventCard
                 identifier={1}
                  first_content={timeSlot[2]?.start_time}
                  second_content={timeSlot[2]?.end_time}
                  handleOpenCloseAddEvent={handleOpenCloseAddEvent}
                  addEvent={addEvent}
                />
              </td>
              <td className="border border-gray-300 px-4 py-1">
                john@example.com
              </td>
              <td className="border border-gray-300 px-4 py-1">123-456-7890</td>
              <td className="border border-gray-300 px-4 py-1">123-456-7890</td>
              <td className="border border-gray-300 px-4 py-1">123-456-7890</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-1">
                <EventCard
                 identifier={1}
                  first_content={timeSlot[3]?.start_time}
                  second_content={timeSlot[3]?.end_time}
                  handleOpenCloseAddEvent={handleOpenCloseAddEvent}
                  addEvent={addEvent}
                />
              </td>
              <td className="border border-gray-300 px-4 py-1">
                <EventCard
                  first_content={lectureSlot[0]?.lecture}
                  lecturer = {lectureSlot[0]?.lecturer}
                  second_content={lectureSlot[0]?.lecture_hall}
                  handleOpenCloseAddEvent={handleOpenCloseAddEvent}
                  addEvent={addEvent}
                />
              </td>
              <td className="border border-gray-300 px-4 py-1">123-456-7890</td>
              <td className="border border-gray-300 px-4 py-1">123-456-7890</td>
              <td className="border border-gray-300 px-4 py-1">123-456-7890</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableCustom;
