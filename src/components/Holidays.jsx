import React, { useEffect, useState } from "react";
import axios from "axios";
import DivisionHolidays from "./DivisionHolidays";

export default function Holidays() {
  let today = new Date();
  const [holidays, setHolidays] = useState({});
  const [division, setDivision] = useState([]);
  const [dateRange, setDateRange] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(today);

  const getHolidays = async () => {
    const response = await axios.get("https://www.gov.uk/bank-holidays.json");
    setHolidays(response.data);
    setDivision(Object.keys(response.data));
  };

  useEffect(() => {
    getHolidays();
  }, []);

  const getPastDate = (date) => {
    let newDate = new Date(today);
    newDate.setDate(newDate.getDate() - date);
    return newDate;
  };

  const handleDateChange = (e) => {
    if (e.target.value === "date-range") {
      setDateRange(true);
    } else {
      setDateRange(false);
      setFromDate(e.target.value);
      setToDate(getPastDate(1));
    }
  };

  return (
    <div>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-3 text-center">
          <label htmlFor="division" className="form-label">
            Division
          </label>
          <select
            id="division"
            className="form-select"
            onChange={(e) => setDivision([e.target.value])}
          >
            <option defaultValue>All</option>
            {Object.keys(holidays).map((division) => {
              return (
                <option key={division} value={division}>
                  {division.replace("-", " ").toUpperCase()}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-md-3 text-center">
          <label htmlFor="Date" className="form-label">
            Date
          </label>
          <select
            id="inputState"
            className="form-select"
            onChange={handleDateChange}
          >
            <option defaultValue>All</option>
            <option value={getPastDate(1)}>Yesterday</option>
            <option value={getPastDate(7)}>Last week</option>
            <option value={getPastDate(30)}>Last month</option>
            <option value="date-range">Date Range</option>
          </select>
        </div>
        <div
          className="col-md-3 col-sm-6 text-center"
          style={{ display: dateRange ? "block" : "none" }}
        >
          <label htmlFor="Date" className="form-label">
            From
          </label>
          <div>
            <input
              type="date"
              name="from"
              id="from"
              className="date-input"
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
        </div>
        <div
          className="col-md-3 col-sm-6 text-center"
          style={{ display: dateRange ? "block" : "none" }}
        >
          <label htmlFor="Date" className="form-label">
            To
          </label>
          <div>
            <input
              type="date"
              name="to"
              id="to"
              className="date-input"
              defaultValue={today}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      {division.map((key) => {
        return (
          <DivisionHolidays
            key={key}
            {...holidays[key]}
            fromDate={fromDate}
            toDate={toDate}
          />
        );
      })}
    </div>
  );
}
