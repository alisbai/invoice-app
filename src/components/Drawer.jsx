import { useSelector } from "react-redux";
import "../styles/components/drawer.scss";
import NewInvoiceFrom from "./NewInvoiceForm";

export default function Drawer() {
        const drawerOpen = useSelector(state => state.drawer.value);
        const lightSwitch = useSelector(state => state.lightSwitch.value);
    return(
        <div 
        className={`drawer ${drawerOpen ? "drawer-open" : "drawer-closed"} ${lightSwitch? "drawer-bright-mode" : "drawer-dark-mode"}`}
        >
            <NewInvoiceFrom />
        </div>
    )
}