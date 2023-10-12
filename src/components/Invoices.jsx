import "../styles/fonts.scss";
import "../styles/components/invoices.scss"
import AddInvoiceButton from "./buttons/AddInvoiceButton";
import InvoicesFilter from "./InvoicesFilter";
import { useSelector } from "react-redux";
export default function Invoices() {

  const lightSwitch = useSelector(state => state.lightSwitch.value);
    return(
        <div className="heading-font-s1 invoices">
            <div className="invoices-header">
                <div className="invoices-title-wrapper">
                    <h1 className={`heading-font-l invoices-title ${lightSwitch ? "invoices-title-bright-mode" : "invoices-title-dark-mode"}`}>Invoices</h1>
                    <span className={`body-font-1 number-of-invoices ${lightSwitch ? "number-of-invoices-bright-mode" : "number-of-invoices-dark-mode"}`}>There are 7 invoices</span>
                </div>
                <InvoicesFilter />
                <AddInvoiceButton text="Add Invoice" />
            </div>
            <div className="invoices-body">

            </div>
        </div>
    )
}