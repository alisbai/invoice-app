import "../../styles/components/buttons/tertiaryButton.scss";
import { useSelector } from "react-redux";
export default function TertiaryButton({
  text,
  type = "button",
  onClick,
  className,
}) {
  const lightSwitch = useSelector((state) => state.lightSwitch.value);
  return (
    <button
      className={`tertiary-button heading-font-s1 ${
        lightSwitch
          ? "tertiary-button-bright-mode"
          : "tertiary-button-dark-mode"
      } ${className}`}
      onClick={onClick}
      type={type}
    >
      <span className="tertiary-button-text">{text}</span>
    </button>
  );
}
