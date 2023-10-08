import "../../styles/components/buttons/button3.scss"
import { useSelector } from "react-redux";
export default function Button3() {
    
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    return (
    <button 
    className={`btn3 heading-font-s1 ${lightSwitch ? "btn3-bright-mode" : "btn3-dark-mode"}`}
    >
        <span className="btn3-text">Edit</span>
    </button>
    )
}