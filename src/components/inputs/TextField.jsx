import "../../styles/components/inputs/textField.scss";
import "../../styles/fonts.scss";

export default function TextField({required = true}) {

    return (
            <input className="heading-font-s1 text-field" type="text" required={required} />
    )
}