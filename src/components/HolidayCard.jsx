import React from "react";

export default function HolidayCard({ title, date, division }) {
  return (
    <div className="card text-center event ">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{division}</p>
      </div>
      <div className="card-footer text-muted">{date}</div>
    </div>
  );
}
