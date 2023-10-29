import { useSelector } from "react-redux";
import "../../styles/components/inputs/textField.scss";
import "../../styles/fonts.scss";

export default function TextField({required = true, type= "text", value ="", onChange,  readOnly = false, className}) {

    const handleChange = (e) => {
        const newVal = e.target.value;
        onChange(newVal);
    }
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    return (
            <input 
                className={`heading-font-s1 text-field ${lightSwitch? "text-field-bright-mode": "text-field-dark-mode"} ${className}`} 
                type={type} 
                required={required} 
                value={value} 
                onChange={handleChange}
                readOnly={readOnly}
            />
    )
}