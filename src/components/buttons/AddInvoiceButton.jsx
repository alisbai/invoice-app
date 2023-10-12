import "../../styles/components/buttons/addInvoiceButton.scss"
import plusSign from "../../assets/icon-plus.svg"
export default function AddInvoiceButton({text}) {

    return <button className="add-invoice-btn heading-font-s1">
            <div className="add-invoice-btn-plus-sign-wrapper">
                <img alt="plus sign" src={plusSign}/>
            </div>
        <span className="add-invoice-btn-text">{text}</span>
    </button>
}