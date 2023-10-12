import "../styles/fonts.scss";
import "../styles/components/invoicesFilter.scss";
import downArrow from "../assets/icon-arrow-down.svg"
import InvoicesFilterMenu from "./inputs/InvoicesFilterMenu";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function InvoicesFilter() {
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    const [filterMenuVisible, setFilterMenuVisible] = useState(false);

    return(
        <div
         className={`heading-font-s1 invoices-filter ${lightSwitch ? "invoices-filter-bright-mode" : "invoices-filter-dark-mode"}`}
         onClick={() => setFilterMenuVisible(!filterMenuVisible)}
         >Filter by status
            <img className="invoices-filter-down-arrow" alt="arrow down"  src={downArrow}/>
            <InvoicesFilterMenu visible={filterMenuVisible} />
        </div>
    )
}