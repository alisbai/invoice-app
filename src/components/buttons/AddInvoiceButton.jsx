import "../../styles/components/buttons/addInvoiceButton.scss";
import plusSign from "../../assets/icon-plus.svg";
import { useSelector } from "react-redux";
export default function AddInvoiceButton({ text, onClick }) {
  const lightSwitch = useSelector((state) => state.lightSwitch.value);
  return (
    <button
      className={`add-invoice-btn heading-font-s1 ${
        lightSwitch
          ? "add-invoice-btn-bright-mode"
          : "add-invoice-button-dark-mode"
      }`}
      onClick={onClick}
    >
      <div className="add-invoice-btn-plus-sign-wrapper">
        <img alt="plus sign" src={plusSign} />
      </div>
      <span className="add-invoice-btn-text">{text}</span>
    </button>
  );
}
