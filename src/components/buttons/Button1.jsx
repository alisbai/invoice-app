import "../../styles/components/buttons/button1.scss"
import plusSign from "../../assets/icon-plus.svg"
export default function Button1() {

    return <button className="btn1 heading-font-s1">
            <div className="btn1-plus-sign-wrapper">
                <img alt="plus sign" src={plusSign}/>
            </div>
        <span className="btn1-text">New Invoices</span>
    </button>
}