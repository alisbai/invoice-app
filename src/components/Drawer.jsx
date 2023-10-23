import { useSelector } from "react-redux";
import "../styles/components/drawer.scss";

export default function Drawer() {
        const drawerOpen = useSelector(state => state.drawer.value);
        const lightSwitch = useSelector(state => state.lightSwitch.value);
    return(
        <div 
        className={`drawer ${drawerOpen ? "drawer-open" : "drawer-closed"} ${lightSwitch? "drawer-bright-mode" : "drawer-dark-mode"}`}
        >
            <div className="drawer-content"></div>
        </div>
    )
}