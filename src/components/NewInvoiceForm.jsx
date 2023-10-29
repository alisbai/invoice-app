import "../styles/fonts.scss";
import "../styles/components/newInvoiceForm.scss";
import { useSelector } from "react-redux";
import Label from "./inputs/Label";
import TextField from "./inputs/TextField";
import Calendar from "./inputs/Calendar";
import Dropdown from "./inputs/Dropdown";
import ItemList from "./ItemList";

export default function NewInvoiceFrom() {
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    return (
        <form className={`new-invoice-form`}>
            <h2 
                className={`heading-font-m  new-invoice-form-heading
                    ${lightSwitch ? "new-invoice-form-heading-bright-mode" : "new-invoice-form-heading-dark-mode"}`}
            >New Invoice</h2>
            <fieldset>
                <span className="heading-font-s1 new-invoice-form-section-title">Bill From</span>
                <Label content="Street Address" />
                <TextField />
                <div className="br"></div>
                <div className="new-invoice-form-3-fields-wrapper">
                    <div>
                        <Label content="City" />
                        <TextField />
                    </div>
                    <div>
                        <Label content="Postal Code" />
                        <TextField />
                    </div>
                    <div>
                        <Label content="Country" />
                        <TextField />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <span className="heading-font-s1 new-invoice-form-section-title">Bill To</span>
                    <Label content="Client's Name" />
                    <TextField />
                    <div className="br"></div>
                    <Label content="Client's Email" />
                    <TextField  type="email"/>
                    <div className="br"></div>
                    <Label content="Street Address" />
                    <TextField />
                    <div className="br"></div>
                <div className="new-invoice-form-3-fields-wrapper">
                    <div>
                        <Label content="City" />
                        <TextField />
                    </div>
                    <div>
                        <Label content="Postal Code" />
                        <TextField />
                    </div>
                    <div>
                        <Label content="Country" />
                        <TextField />
                    </div>
                </div>
                <div className="new-invoice-form-2-fields-wrapper">
                    <div>
                        <Label content="Invoice Date" />
                        <Calendar />
                    </div>
                    <div>
                        <Label content="Invoice Date" />
                        <Dropdown options={["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"]} />
                    </div>
                </div>
                    <Label content="Project Description" />
                    <TextField />
            </fieldset>
            <fieldset>
                <ItemList />
            </fieldset>
        </form>
    )
}