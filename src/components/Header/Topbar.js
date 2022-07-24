import dayjs from "dayjs";
import React from "react";
import { useState, useEffect } from "react";
export default function Topbar() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(dayjs().format("dddd, MMMM D YYYY, hh:mm:ss"));
    });
  }, []);

  return (
    <div className="bg-primary py-1">
      <div className="container">
        <div className="col">
          <div className="row">
            <p className="mb-0 text-center ">{currentTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
