import { useDispatch, useSelector } from "react-redux";
import "../styles/components/popup.scss";
import "../styles/fonts.scss";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "./buttons/DeleteButton";
import SecondaryButton from "./buttons/SecondaryButton";
import { hideModal } from "../redux/modal";
import { deleteInvoice } from "../redux/data";
import { hidePopup } from "../redux/popup";

const Popup = () => {
  const lightSwitch = useSelector((state) => state.lightSwitch.value);
  const { invoiceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInvoiceDeletion = () => {
    dispatch(deleteInvoice({ id: invoiceId }));
    navigate("/");
    dispatch(hideModal());
  };

  const handleCancelDeletion = () => {
    dispatch(hidePopup());
    dispatch(hideModal());
  };
  return (
    <div
      className={`popup ${
        lightSwitch ? "popup-bright-mode" : "popup-dark-mode"
      }`}
    >
      <h2 className="heading-font-m">Confirm Deletion</h2>
      <p className="body-font-1 popup-text-message">
        Are you sure you want to delete invoice #{invoiceId}? This action cannot
        be undone.
      </p>
      <div className="popup-action-buttons-wrapper">
        <SecondaryButton onClick={handleCancelDeletion} text="Cancel" />
        <DeleteButton
          onClick={handleInvoiceDeletion}
          className="popup-delete-button"
        />
      </div>
    </div>
  );
};

export default Popup;
