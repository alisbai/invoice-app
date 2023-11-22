import "../../styles/components/buttons/secondaryButton.scss"
import { useSelector } from "react-redux";
export default function SecondaryButton({text ,type="button", onClick}) {
    
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    return (
    <button 
    className={`secondary-button heading-font-s1 ${lightSwitch ? "secondary-button-bright-mode" : "secondary-button-dark-mode"}`}
    onClick={onClick}
    type={type}
    >
        <span className="secondary-button-text">{text}</span>
    </button>
    )
}