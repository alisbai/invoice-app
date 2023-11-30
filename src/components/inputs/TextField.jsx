import { useSelector } from "react-redux";
import { forwardRef } from "react";
import "../../styles/components/inputs/textField.scss";
import "../../styles/fonts.scss";

const TextField = forwardRef(({required = true, type= "text",name, onChange, onBlur, error, readOnly = false, className = ""}, ref) => {

    const lightSwitch = useSelector(state => state.lightSwitch.value);
    return (
            <input 
                className={`heading-font-s1 text-field ${lightSwitch? "text-field-bright-mode": "text-field-dark-mode"} ${error? "text-field-error": ""} ${className}`} 
                type={type} 
                required={required} 
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                readOnly={readOnly}
            />
    )
})

export default TextField;