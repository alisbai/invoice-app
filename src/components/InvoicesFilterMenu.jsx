import { useState } from "react";
import "../styles/components/invoicesFilterMenu.scss";
import { useSelector } from "react-redux";

export default function InvoicesFilterMenu({visible, filterOptions=["Draft", "Pending", "Paid"]}) {
    const [filterOptionsState, setFilterOptionsState] = useState(
        filterOptions.map(filterOption => {
            return {
                option: filterOption,
                checked: false
            }
        })
    );
    const toggleFilterOptionsState = (index) => {
        const newFilterOptionsState = filterOptionsState.map(filterOption => {
            return {
                option: filterOption.option, 
                checked: filterOption.checked
            }
        });
        newFilterOptionsState[index].checked = !newFilterOptionsState[index].checked;
        setFilterOptionsState(newFilterOptionsState);
    }

    const lightSwitch = useSelector(state => state.lightSwitch.value);
    return (
        <div onClick={(e) => e.stopPropagation()} className={`invoices-filter-menu ${visible ? "invoices-filter-menu-visible": "invoices-filter-menu-hidden"} ${lightSwitch ? "invoices-filter-menu-bright-mode" : "invoices-filter-menu-dark-mode"}`}>
            {filterOptionsState.map((filterOption, i) => <div onClick={() => toggleFilterOptionsState(i)} className="invoices-filter-option" key={i}><input className="invoices-filter-checkbox" type="checkbox" checked={filterOption.checked}/>{filterOption.option}</div>)}
        </div>
    )
}