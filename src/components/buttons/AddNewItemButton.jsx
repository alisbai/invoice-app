import "../../styles/components/buttons/addNewItemButton.scss"
import {useSelector} from "react-redux";
export default function AddNewItemButton({className, type="button", onClick}) {
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    return (
    <button className={`add-new-item-button heading-font-s1 ${lightSwitch ? "add-new-item-button-bright-mode" : "add-new-item-button-dark-mode"} ${className}`} 
    type={type}
    onClick={onClick}
    >
        <span className="add-new-item-button-text">+ Add New Item</span>
    </button>
    )
}