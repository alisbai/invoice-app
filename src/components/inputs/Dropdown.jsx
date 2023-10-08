import "../../styles/fonts.scss"
import "../../styles/components/inputs/dropdown.scss"
import arrowDown from  "../../assets/icon-arrow-down.svg"
import { useSelector } from "react-redux";
export default function Dropdown() {
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    return(
        <div 
            className={`dropdown heading-font-s1 ${lightSwitch ? "dropdown-bright-mode" : "dropdown-dark-mode"}`} dropdown tabIndex={0}
        >
        ssd;flkj
            <span className="dropdown-arrow-down"><img alt="arrow down" src={arrowDown} /></span>
        </div>
    )
}