import "../../styles/components/buttons/button4.scss"
import { useSelector } from "react-redux"
export default function Button4() {
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    return (
    <button 
    className={`btn4 heading-font-s1 ${lightSwitch ? "btn4-bright-mode" : "btn4-dark-mode"}`}
    >
        <span className="btn3-text">Save As Draft</span>
    </button>
    )
}