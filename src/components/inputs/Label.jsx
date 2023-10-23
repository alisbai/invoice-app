import "../../styles/fonts.scss";
import "../../styles/components/inputs/label.scss";
import { useSelector } from "react-redux";

export default function Label({content= ""}) {
    const lightSwitch = useSelector(state => state.lightSwitch.value);

    return (
        <label 
        className={`body-font-1 label ${lightSwitch ? "label-bright-mode": "label-dark-mode"}`}
        >{content}
        </label>
    )
}