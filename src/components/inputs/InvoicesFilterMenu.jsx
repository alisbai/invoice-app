import "../../styles/components/invoicesFilterMenu.scss";
import { useSelector } from "react-redux";

export default function InvoicesFilterMenu({visible}) {
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    return (
        <div className={`invoices-filter-menu ${visible ? "invoices-filter-menu-visible": "invoices-filter-menu-hidden"} ${lightSwitch ? "invoices-filter-menu-bright-mode" : "invoices-filter-menu-dark-mode"}`}></div>
    )
}