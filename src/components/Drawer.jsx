import { useSelector } from "react-redux";
import "../styles/components/drawer.scss";
import NewInvoiceFrom from "./NewInvoiceForm";
import { useState } from "react";
import UpdateInvoiceForm from "./UpdateInvoiceForm";
export default function Drawer() {
  const drawerOpen = useSelector((state) => state.drawer.value);
  const lightSwitch = useSelector((state) => state.lightSwitch.value);
  const [
    formActionButtonsWrapperClassName,
    setFormActionButtonsWrapperClassName,
  ] = useState("form-action-buttons-wrapper-box-shadow");
  const drawerContent = useSelector((state) => state.drawerContent.value);
  const generateDrawerContent = () => {
    switch (drawerContent) {
      case "newInvoice":
        return (
          <NewInvoiceFrom
            formActionButtonsWrapperClassName={
              formActionButtonsWrapperClassName
            }
          />
        );
      case "updateInvoice":
        return (
          <UpdateInvoiceForm
            formActionButtonsWrapperClassName={
              formActionButtonsWrapperClassName
            }
          />
        );
      default:
        return null;
    }
  };
  const handleScroll = (e) => {
    const target = e.target;
    // Calculate how far the element is scrolled from the top
    const scrollPosition = target.scrollTop;

    // Calculate the maximum scroll position (element height - container height)
    const maxScroll = target.scrollHeight - target.clientHeight;
    // Check if the element is scrolled to the bottom
    if (scrollPosition === maxScroll) {
      // The element is scrolled to the bottom, so you can perform your desired action here.
      setFormActionButtonsWrapperClassName("");
    } else {
      setFormActionButtonsWrapperClassName(
        "form-action-buttons-wrapper-box-shadow"
      );
    }
  };
  return (
    <div
      className={`drawer ${drawerOpen ? "drawer-open" : "drawer-closed"} ${
        lightSwitch ? "drawer-bright-mode" : "drawer-dark-mode"
      }`}
      onScroll={handleScroll}
    >
      {generateDrawerContent()}
    </div>
  );
}
