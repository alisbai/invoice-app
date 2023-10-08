import "../../styles/components/inputs/textField.scss";
import "../../styles/fonts.scss";

export default function TextField({required = true, isBrightMode= false}) {

    return (
            <input className={`heading-font-s1 text-field ${isBrightMode? "text-field-bright-mode": "text-field-dark-mode"}`} type="text" required={required} />
    )
}