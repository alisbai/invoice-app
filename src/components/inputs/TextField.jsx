import { useSelector } from "react-redux";
import "../../styles/components/inputs/textField.scss";
import "../../styles/fonts.scss";

export default function TextField({required = true}) {

    const lightSwitch = useSelector(state => state.lightSwitch.value);
    return (
            <input 
                className={`heading-font-s1 text-field ${lightSwitch? "text-field-bright-mode": "text-field-dark-mode"}`} type="text" required={required} 
            />
    )
}