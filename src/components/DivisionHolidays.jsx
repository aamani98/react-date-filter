import React, { useEffect, useState } from "react";
import HolidayCard from "./HolidayCard";

export default function DivisionHolidays({
  division,
  events,
  fromDate,
  toDate,
}) {
  const [holidays, setHolidays] = useState([]);
  const filterByDate = () => {
    if (fromDate && toDate) {
      const filteredData = events.filter(
        (event) =>
          new Date(event.date) >= new Date(fromDate) &&
          new Date(event.date) <= new Date(toDate)
      );
      setHolidays(filteredData);
    } else {
      console.log("else");
      setHolidays(events);
    }
  };

  useEffect(() => {
    filterByDate();
  }, [fromDate, toDate]);
  return (
    <div className="events">
      {holidays.map((event, index) => {
        return (
          <HolidayCard
            key={index}
            division={division}
            date={event.date}
            title={event.title}
          />
        );
      })}
    </div>
  );
}
