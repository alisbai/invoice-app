import "../../styles/fonts.scss"
import "../../styles/components/inputs/dropdown.scss"
import arrowDown from  "../../assets/icon-arrow-down.svg"
import DropdownOptionItem from "./DropdownOptionItem"
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Dropdown({options=[], onChange, selectedValue}) {
    const lightSwitch = useSelector(state => state.lightSwitch.value);

    const updateDisplayedValue = (newVal) => {
        onChange(newVal);
    }
    const [dropdownContentOpen, setContentOpen] = useState(false);

    const  handleOptionsToggle = () => {
        setContentOpen(!dropdownContentOpen);
    }

    const dropdownContent = options.map((option, i) => <DropdownOptionItem isChosen={selectedValue === parseInt(options[i].match(/\d+/))} value= {option}  onClick={() => {updateDisplayedValue(parseInt(options[i].match(/\d+/))); handleOptionsToggle()}} />)

    const findOptionToDisplay = () => {
        const regex = new RegExp(`${selectedValue} `);
        const option = options.filter(option => regex.test(option));
        return option;
    }
    return(
        <div className="dropdown-wrapper">
            <div 
                className={`dropdown heading-font-s1 ${(dropdownContentOpen && lightSwitch) && "dropdown-bright-mode-focused"} ${lightSwitch ? "dropdown-bright-mode" : "dropdown-dark-mode"}`} 
                onClick={handleOptionsToggle}
                dropdown tabIndex={0}
            >
            {findOptionToDisplay()}
                <span className="dropdown-arrow-down">
                    <img 
                        alt="dropdown down" 
                        src={arrowDown}
                    />
                </span>
            </div>
            <div className={`dropdown-content-wrapper ${dropdownContentOpen ? "" : "dropdown-content-hidden"} ${lightSwitch ? "dropdown-content-wrapper-bright-mode" : "dropdown-content-wrapper-dark-mode"}`}>
                {dropdownContent}
            </div>
        </div>
    )
}