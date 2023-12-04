import "../styles/components/lightSwitchWrapper.scss";
import { useDispatch, useSelector } from "react-redux";
import { switchLight } from "../redux/lightSwitch";
import sunIcon from "../assets/icon-sun.svg";
import moonIcon from "../assets/icon-moon.svg";

export default function LightSwitchWrapper() {
  const lightSwitch = useSelector((state) => state.lightSwitch.value);
  const dispatch = useDispatch();
  return (
    <div className="light-switch-wrapper">
      <img
        className="light-switch-image"
        onClick={() => dispatch(switchLight())}
        alt="bright/dark mode switch"
        src={lightSwitch ? moonIcon : sunIcon}
      />
    </div>
  );
}
