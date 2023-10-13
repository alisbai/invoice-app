import "../styles/fonts.scss";
import "../styles/components/invoices.scss"
import AddInvoiceButton from "./buttons/AddInvoiceButton";
import InvoicesFilter from "./InvoicesFilter";
import { useSelector } from "react-redux";
import Invoice from "./Invoice";
import data from "../data.json";
export default function Invoices() {
  const lightSwitch = useSelector(state => state.lightSwitch.value);
  const screenDimensions = useSelector(state => state.screenDimensions.value);
  const generateInvoices = () =>{
    return  data.map(datum => {
                const id = datum.id;
                const  due = datum.paymentDue;
                const clientName = datum.clientName;
                const totalPrice = datum.total;
                const status = datum.status
                return <Invoice 
                    id={id}
                    due={due} 
                    clientName={clientName} 
                    totalPrice={totalPrice} 
                    status={status} 
                    key={id}
                />
            })
  }
    return(
        <div className="heading-font-s1 invoices">
            <div className="invoices-header">
                <div className="invoices-title-wrapper">
                    <h1 className={`${screenDimensions.width >430 ? "heading-font-l" : "heading-font-m"} invoices-title ${lightSwitch ? "invoices-title-bright-mode" : "invoices-title-dark-mode"}`}>Invoices</h1>
                    <span className={`body-font-1 number-of-invoices ${lightSwitch ? "number-of-invoices-bright-mode" : "number-of-invoices-dark-mode"}`}>{screenDimensions.width >430? "There Are 7 invoices" : "7 invoices"}</span>
                </div>
                <InvoicesFilter />
                <AddInvoiceButton text={screenDimensions.width > 768 ? "Add Invoice" : "Add"} />
            </div>
            <div className="invoices-body">
               {generateInvoices()}
            </div>
        </div>
    )
}