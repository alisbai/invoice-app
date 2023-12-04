import "../styles/components/modal.scss";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Modal = ({ children }) => {
  const isModalOpen = useSelector((state) => state.modal.value);
  const isPopupVisible = useSelector((state) => state.popup.value);
  return (
    <div className={`backdrop modal ${isModalOpen ? "" : "modal-hidden"}`}>
      <div className="modal-content">{isPopupVisible && children}</div>
    </div>
  );
};

export default Modal;
