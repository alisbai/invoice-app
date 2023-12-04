import "../../styles/components/inputs/dropdownOptionItem.scss";
import "../../styles/fonts.scss";
import { useSelector } from "react-redux";

export default function DropdownOptionItem({ value, isChosen, onClick }) {
  const lightSwitch = useSelector((state) => state.lightSwitch.value);
  return (
    <div
      className={`dropdown-option-item ${
        lightSwitch
          ? "dropdown-option-item-bright-mode"
          : "dropdown-option-item-dark-mode"
      } heading-font-s1 ${isChosen && "dropdown-option-item-chosen"}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
}
