import { useSelector } from "react-redux";
import "../styles/fonts.scss";
import "../styles/components/invoice.scss";
import rightArrow from "../assets/icon-arrow-right.svg"
import Tag from "./Tag";
import { toNumber, toString } from "lodash";
export default function Invoice({id= "RT3080", due="19 Aug 2021", clientName="Jensen Huang", totalPrice="1,800.90", status, className=""}) {
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    const screenDimensions = useSelector(state => state.screenDimensions.value);
    let invoice = null;
    const formattedPrice = toString(toNumber(totalPrice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

    if(screenDimensions.width > 600) {
        invoice = (
    <div className={`invoice ${lightSwitch? "invoice-bright-mode": "invoice-dark-mode"} ${className}`}>
        <span className="invoice-id"><span className="invoice-hashtag">#</span>{id}</span>
        <span className={`body-font-1 invoice-payment-due ${lightSwitch ? "invoice-payment-due-bright-mode" : "invoice-payment-due-dark-mode"}`}><span className="invoice-due-word">Due</span> {due}</span>
        <span className={`body-font-1  invoice-client-name ${lightSwitch ? "invoice-client-name-bright-mode" : "invoice-client-name-dark-mode"}`}>{clientName}</span>
        <span className="invoice-total-price">£ {formattedPrice}</span>
        <Tag value={status} />
        <img className="invoice-right-arrow" alt="right arrow" src={rightArrow} />
    </div>)
    } else {
        invoice =(
            <div className={`invoice ${lightSwitch? "invoice-bright-mode": "invoice-dark-mode"}  ${className}`}>
                <div className="invoice-left-section">
                    <span className="invoice-id"><span className="invoice-hashtag">#</span>{id}</span>
                    <div className="invoice-due-price-wrapper">
                        <span className={`body-font-1 invoice-payment-due ${lightSwitch ? "invoice-payment-due-bright-mode" : "invoice-payment-due-dark-mode"}`}><span className="invoice-due-word">Due</span> {due}</span>
                        <span className="invoice-total-price">£ {formattedPrice}</span>
                    </div>
                </div>
                <div className="invoice-right-section">
                    <span className={`body-font-1  invoice-client-name ${lightSwitch ? "invoice-client-name-bright-mode" : "invoice-client-name-dark-mode"}`}>{clientName}</span>
                    <Tag value={status} />
                </div>
            </div>
        )
    }
    return (
        invoice
    )
}