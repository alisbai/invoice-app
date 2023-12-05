import { useEffect, useState } from "react";
import "../../styles/components/inputs/calendar.scss";
import CalendarTile from "./CalendarTile";
import "../../styles/fonts.scss";
import arrowLeft from "../../assets/icon-arrow-left.svg";
import arrowRight from "../../assets/icon-arrow-right.svg";
import calendarIcon from "../../assets/icon-calendar.svg";
import { useSelector } from "react-redux";
import { padStart } from "lodash";

export default function Calendar({ value, onChange }) {
  const lightSwitch = useSelector((state) => state.lightSwitch.value);

  const [calendarContentOpen, setCalendarContentOpen] = useState(false);

  const handleCalendarContentToggle = () => {
    setCalendarContentOpen(!calendarContentOpen);
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [selectedDate, setSelectedDate] = useState({
    year: parseInt(value.slice(0, 4)),
    month: parseInt(value.slice(5, 7)) - 1,
    day: parseInt(value.slice(-2)),
  });

  useEffect(() => {
    onChange(
      `${selectedDate.year}-${padStart(
        selectedDate.month + 1,
        2,
        "0"
      )}-${padStart(selectedDate.day, 2, "0")}`
    );
  }, [selectedDate]);

  const [workingDate, setWorkingDate] = useState({
    year: selectedDate.year,
    month: selectedDate.month,
  });

  const [firstDayOfWorkingMonth, setFirstDayOfWorkingMonth] = useState(
    new Date(workingDate.year, workingDate.month, 1).getDay()
  );

  //how many days in the working month
  const [workingMonthLastDate, setWorkingMonthLastDate] = useState(
    new Date(workingDate.year, workingDate.month + 1, 0).getDate()
  );
  //what is the last day of the working month
  const [nextMonthFirstDay, setNextMonthFirstDay] = useState(
    new Date(workingDate.year, workingDate.month + 1, 1).getDay()
  );
  // how many days in the previous month
  const [previousMonthLastDate, setPreviousMonthLastDate] = useState(
    new Date(workingDate.year, workingDate.month, 0).getDate()
  );
  //update first of working month whenever the working month changes
  useEffect(() => {
    setFirstDayOfWorkingMonth(
      new Date(workingDate.year, workingDate.month, 1).getDay()
    );
    setWorkingMonthLastDate(
      new Date(workingDate.year, workingDate.month + 1, 0).getDate()
    );
    setNextMonthFirstDay(
      new Date(workingDate.year, workingDate.month + 1, 1).getDay()
    );
    setPreviousMonthLastDate(
      new Date(workingDate.year, workingDate.month, 0).getDate()
    );
  }, [workingDate]);

  const manipulateCalendar = () => {
    const dates = [];
    let calendarTileValue = null;
    for (let i = 0; i < firstDayOfWorkingMonth; i++) {
      calendarTileValue =
        previousMonthLastDate - firstDayOfWorkingMonth + i + 1;
      dates.push(<CalendarTile value={calendarTileValue} />);
    }
    for (let i = 1; i <= workingMonthLastDate; i++) {
      calendarTileValue = i;
      dates.push(
        <CalendarTile
          isInWorkingMonth={true}
          value={calendarTileValue}
          isChosen={
            calendarTileValue === selectedDate.day &&
            workingDate.month === selectedDate.month &&
            workingDate.year === selectedDate.year
          }
          onClick={(dayVal) =>
            setSelectedDate({
              year: workingDate.year,
              month: workingDate.month,
              day: dayVal,
            })
          }
        />
      );
    }
    for (let i = nextMonthFirstDay; i < 7; i++) {
      calendarTileValue = i - nextMonthFirstDay + 1;
      dates.push(<CalendarTile value={calendarTileValue} />);
    }
    return dates;
  };

  const addMonthToWorkingDate = () => {
    if (workingDate.month === 11) {
      setWorkingDate({ year: workingDate.year + 1, month: 0 });
    } else {
      setWorkingDate({ ...workingDate, month: workingDate.month + 1 });
    }
  };

  const subtractMonthFromWorkingDate = () => {
    if (workingDate.month === 0) {
      setWorkingDate({ year: workingDate.year - 1, month: 11 });
    } else {
      setWorkingDate({ ...workingDate, month: workingDate.month - 1 });
    }
  };

  return (
    <div className="calendar-wrapper">
      <div
        className={`calendar-field heading-font-s1 ${
          calendarContentOpen && lightSwitch
            ? "calendar-field-bright-mode-focused"
            : ""
        } ${
          lightSwitch
            ? "calendar-field-bright-mode"
            : "calendar-field-dark-mode"
        }`}
        onClick={handleCalendarContentToggle}
        dropdown
        tabIndex={0}
      >
        {`${selectedDate.day} ${months[selectedDate.month]} ${
          selectedDate.year
        }`}
        <img alt="dropdown down" src={calendarIcon} className="calendar-icon" />
      </div>
      <div
        className={`calendar heading-font-s1 ${
          lightSwitch ? "calendar-bright-mode" : "calendar-dark-mode"
        } ${calendarContentOpen ? "" : "calendar-hidden"}`}
      >
        <div className="calendar-header">
          <img
            className="calendar-arrow-prev"
            onClick={subtractMonthFromWorkingDate}
            alt="arrow left"
            src={arrowLeft}
          />
          <div>
            <p>{months[workingDate.month] + " " + workingDate.year}</p>
          </div>
          <img
            className="calendar-arrow-next"
            onClick={addMonthToWorkingDate}
            alt="arrow right"
            src={arrowRight}
          />
        </div>
        <div className="calendar-body">
          <ul className="calendar-dates">{manipulateCalendar()}</ul>
        </div>
      </div>
    </div>
  );
}
