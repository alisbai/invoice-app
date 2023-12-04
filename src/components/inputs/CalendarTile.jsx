import "../../styles/components/inputs/calendarTile.scss";
import { useSelector } from "react-redux";

export default function CalendarTile({
  isChosen = false,
  isInWorkingMonth = false,
  value,
  onClick = () => {},
}) {
  const lightSwitch = useSelector((state) => state.lightSwitch.value);

  return (
    <li
      className={`calendar-tile ${
        isInWorkingMonth
          ? "calendar-tile-in-working-month"
          : "calendar-tile-not-in-working-month"
      } ${isChosen ? "calendar-tile-chosen" : ""}
      ${
        lightSwitch
          ? "calendar-tile-in-working-month-bright-mode"
          : "calendar-tile-in-working-month-dark-mode"
      }`}
      onClick={() => onClick(value)}
    >
      {value}
    </li>
  );
}
