import "../styles/fonts.scss";
import "../styles/components/invoices.scss";
import AddInvoiceButton from "./buttons/AddInvoiceButton";
import InvoicesFilter from "./InvoicesFilter";
import { useSelector, useDispatch } from "react-redux";
import emptyHero from "../assets/illustration-empty.svg";
import Invoice from "./Invoice";
import { capitalize, size } from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import { openDrawer } from "../redux/drawer";
import { showModal } from "../redux/modal";
import { hidePopup } from "../redux/popup";

export default function Invoices({
  filterOptions = ["Draft", "Pending", "Paid"],
}) {
  const lightSwitch = useSelector((state) => state.lightSwitch.value);
  const screenDimensions = useSelector((state) => state.screenDimensions.value);
  const data = useSelector((state) => state.data.value);
  const dispatch = useDispatch();

  const [dataState, setDataState] = useState(data);
  const [filterBy, setFilterBy] = useState(filterOptions);

  const generateInvoices = () => {
    return dataState.map((datum, i) => {
      const id = datum.id;
      const due = datum.paymentDue;
      const clientName = datum.clientName;
      const totalPrice = datum.total;
      const status = datum.status;
      return (
        <Invoice
          id={id}
          due={due}
          clientName={clientName}
          totalPrice={totalPrice}
          status={status}
          key={id}
          className={dataState.length === i + 1 ? "invoice-last" : ""}
        />
      );
    });
  };

  const generateNumberOfInvoicesString = () => {
    let numOfInvoices = null;

    if (size(dataState) === 1) {
      screenDimensions.width > 430
        ? (numOfInvoices = "There Is 1 Invoice")
        : (numOfInvoices = "1 Invoice");
    } else {
      screenDimensions.width > 430
        ? (numOfInvoices = `There Are ${size(dataState)} Invoices`)
        : (numOfInvoices = `${size(dataState)} Invoices`);
    }
    return numOfInvoices;
  };

  const updateFilterBy = (filterBy) => {
    setFilterBy(filterBy);
  };

  const onClick = () => {
    dispatch(openDrawer());
    dispatch(hidePopup());
    dispatch(showModal());
  };

  const filterInvoices = () => {
    setDataState(
      data.filter((datum) => filterBy.includes(capitalize(datum.status)))
    );
  };

  useEffect(() => {
    filterInvoices();
  }, [filterBy]);

  useEffect(() => {
    filterInvoices();
  }, [data]);

  return (
    <div className="heading-font-s1 invoices">
      <div className="invoices-header">
        <div className="invoices-title-wrapper">
          <h1
            className={`${
              screenDimensions.width > 430 ? "heading-font-l" : "heading-font-m"
            } invoices-title ${
              lightSwitch
                ? "invoices-title-bright-mode"
                : "invoices-title-dark-mode"
            }`}
          >
            Invoices
          </h1>
          <span
            className={`body-font-1 number-of-invoices ${
              lightSwitch
                ? "number-of-invoices-bright-mode"
                : "number-of-invoices-dark-mode"
            }`}
          >
            {generateNumberOfInvoicesString()}
          </span>
        </div>

        <InvoicesFilter
          filterOptions={filterOptions}
          updateFilterBy={updateFilterBy}
        />

        <AddInvoiceButton
          text={screenDimensions.width > 768 ? "Add Invoice" : "Add"}
          onClick={onClick}
        />
      </div>
      <div className="invoices-body">
        {dataState.length ? (
          generateInvoices()
        ) : (
          <div className="no-invoices-wrapper">
            <img className="img-empty" alt="empty invoices" src={emptyHero} />
            <h2
              className={`heading-font-m no-invoices-heading ${
                lightSwitch
                  ? "no-invoices-heading-bright-mode"
                  : "no-invoices-heading-dark-mode"
              }`}
            >
              There is nothing here
            </h2>
            <p
              className={`body-font-1 ${
                lightSwitch
                  ? "no-invoices-paragraph-bright-mode"
                  : "no-invoices-paragraph-dark-mode"
              }`}
            >
              Create an invoice by clicking the New button and get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
