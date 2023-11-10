import "../../styles/fonts.scss"
import "../../styles/components/inputs/dropdown.scss"
import arrowDown from  "../../assets/icon-arrow-down.svg"
import DropdownOptionItem from "./DropdownOptionItem"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Dropdown({options=[], onChange}) {
    const lightSwitch = useSelector(state => state.lightSwitch.value);

    const [selectedValue, setSelectedValue
    ] = useState(options[0]);

    const updateDisplayedValue = (newVal) => {
        setSelectedValue(newVal)
    }
    const [dropdownContentOpen, setContentOpen] = useState(false);

    const  handleOptionsToggle = () => {
        setContentOpen(!dropdownContentOpen);
    }

    useEffect(()=> {
        onChange(selectedValue);
    }, [selectedValue])


    const dropdownContent = options.map((option, i) => <DropdownOptionItem isChosen={selectedValue === options[i]} value= {option}  onClick={() => {updateDisplayedValue(options[i]); handleOptionsToggle()}} />)

    return(
        <div className="dropdown-wrapper">
            <div 
                className={`dropdown heading-font-s1 ${(dropdownContentOpen && lightSwitch) && "dropdown-bright-mode-focused"} ${lightSwitch ? "dropdown-bright-mode" : "dropdown-dark-mode"}`} 
                onClick={handleOptionsToggle}
                dropdown tabIndex={0}
            >
            {selectedValue}
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