import "../../styles/fonts.scss";
import "../../styles/components/inputs/label.scss";
import { useSelector } from "react-redux";

export default function Label({content= "", error ,errorMessage}) {
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    return (
        <label 
        className={`body-font-1 label ${lightSwitch ? "label-bright-mode": "label-dark-mode"} ${error? "label-error-message": ""}`}
        >
            <span>{content}</span>
            <span>{errorMessage}</span>
        </label>
    )
}