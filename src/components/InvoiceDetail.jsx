import { Link, useParams } from "react-router-dom";
import "../styles/components/invoiceDetail.scss";
import "../styles/fonts.scss";
import { useSelector, useDispatch } from "react-redux";
import Tag from "./Tag";
import DeleteButton from "./buttons/DeleteButton";
import PrimaryButton from "./buttons/PrimaryButton";
import { updateInvoiceStatus } from "../redux/data";
import SecondaryButton from "./buttons/SecondaryButton";
import { showModal } from "../redux/modal";
import { showPopup } from "../redux/popup";
import { updateDrawerContent } from "../redux/drawerContent";
import { openDrawer } from "../redux/drawer";
import arrowLeft from "../assets/icon-arrow-left.svg";

const InvoiceDetail = () => {
  const dispatch = useDispatch();
  const { invoiceId } = useParams();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const invoiceData = useSelector((state) => state.data.value).find(
    (invoice) => invoice.id === invoiceId
  );
  const lightSwitch = useSelector((state) => state.lightSwitch.value);
  const screenDimensions = useSelector((state) => state.screenDimensions.value);
  const markAsPaid = () => {
    dispatch(updateInvoiceStatus({ id: invoiceId }));
  };
  const handleDeleteButtonClick = () => {
    dispatch(showPopup());
    dispatch(showModal());
  };

  const handleOpenDrawer = () => {
    dispatch(updateDrawerContent({ drawerType: "updateInvoice" }));
    dispatch(showModal());
    dispatch(openDrawer());
  };

  const generateActionBar = () => {
    if (screenDimensions.width >= 675) {
      return (
        <div
          className={`invoice-detail-action-bar ${
            lightSwitch
              ? "invoice-detail-action-bar-bright-mode"
              : "invoice-detail-action-bar-dark-mode"
          }`}
        >
          <div className="invoice-detail-status-section">
            <span>Status</span>
            <Tag value={invoiceData.status} />
          </div>
          <div className="invoice-detail-action-buttons-wrapper">
            <SecondaryButton onClick={handleOpenDrawer} text="Edit" />
            <DeleteButton
              onClick={handleDeleteButtonClick}
              className="invoice-detail-delete-button"
            />
            {invoiceData.status !== "paid" && (
              <PrimaryButton
                className="invoice-detail-mark-as-paid-button"
                onClick={markAsPaid}
                text="Mark as Paid"
              />
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`invoice-detail-action-bar ${
            lightSwitch
              ? "invoice-detail-action-bar-bright-mode"
              : "invoice-detail-action-bar-dark-mode"
          }`}
        >
          <span>Status</span>
          <Tag value={invoiceData.status} />
        </div>
      );
    }
  };
  const generateItems = () => {
    let items;
    if (screenDimensions.width >= 675) {
      items = [
        <div className="invoice-detail-item-name invoice-detail-gray-text">
          Item Name
        </div>,
        <div className="invoice-detail-item-quantity invoice-detail-gray-text">
          Qty.
        </div>,
        <div className="invoice-detail-item-price invoice-detail-gray-text">
          Price
        </div>,
        <div className="invoice-detail-item-total invoice-detail-gray-text">
          Total
        </div>,
      ];
      items = [
        ...items,
        invoiceData.items.map((item) => {
          return (
            <>
              <div
                className={`invoice-detail-item-name heading-font-s1 ${
                  lightSwitch
                    ? "invoice-detail-black-text"
                    : "invoice-detail-white-text"
                }`}
              >
                {item.name}
              </div>
              <div className="invoice-detail-item-quantity invoice-detail-gray-text heading-font-s1">
                {item.quantity}
              </div>
              <div className="invoice-detail-item-price invoice-detail-gray-text heading-font-s1">
                £{item.price}
              </div>
              <div
                className={`invoice-detail-item-total heading-font-s1 ${
                  lightSwitch
                    ? "invoice-detail-black-text"
                    : "invoice-detail-white-text"
                }`}
              >
                £{item.total}
              </div>
            </>
          );
        }),
      ];
    } else {
      items = invoiceData.items.map((item) => {
        return (
          <div className="heading-font-s1 invoice-detail-item-wrapper">
            <div className="invoice-detail-item-wrapper-name-quantity-price">
              <span
                className={`invoice-detail-item-name heading-font-s1 ${
                  lightSwitch
                    ? "invoice-detail-black-text"
                    : "invoice-detail-white-text"
                }`}
              >
                {item.name}
              </span>
              <span className="invoice-detail-quantity-x-price">
                {item.quantity}x £ {item.price}
              </span>
            </div>
            <span
              className={`invoice-detail-item-price heading-font-s1 ${
                lightSwitch
                  ? "invoice-detail-black-text"
                  : "invoice-detail-white-text"
              }`}
            >
              £ {item.total}
            </span>
          </div>
        );
      });
    }
    return items;
  };

  const generateActionButtonsForSmallScreen = () => {
    if (screenDimensions.width >= 675) {
      return;
    } else {
      return (
        <div
          className={`invoice-detail-action-buttons-wrapper ${
            lightSwitch
              ? "invoice-detail-action-buttons-wrapper-bright-mode"
              : "invoice-detail-action-buttons-wrapper-dark-mode"
          }`}
        >
          <SecondaryButton onClick={handleOpenDrawer} text="Edit" />
          <DeleteButton
            onClick={handleDeleteButtonClick}
            className="invoice-detail-delete-button"
          />
          {invoiceData.status !== "paid" && (
            <PrimaryButton
              className="invoice-detail-mark-as-paid-button"
              onClick={markAsPaid}
              text="Mark as Paid"
            />
          )}
        </div>
      );
    }
  };

  return (
    <>
      <div className="invoice-detail body-font-1">
        <Link
          className={`heading-font-s1 invoice-detail-go-back-link ${
            lightSwitch
              ? "invoice-detail-go-back-link-bright-mode"
              : "invoice-detail-go-back-link-dark-mode"
          }`}
          to="/"
        >
          <img src={arrowLeft} alt="left arrow" />
          Go Back
        </Link>
        {generateActionBar()}
        <div
          className={`invoice-detail-info ${
            lightSwitch
              ? "invoice-detail-info-bright-mode"
              : "invoice-detail-info-dark-mode"
          }`}
        >
          <div className={`invoice-detail-info-top`}>
            <div className="invoice-detail-info-id-description">
              <span
                className={`heading-font-s1 
                ${
                  lightSwitch
                    ? "invoice-detail-black-text"
                    : "invoice-detail-white-text"
                }`}
              >
                <span className="id-hashtag invoice-detail-gray-text">#</span>
                {invoiceData.id}
              </span>
              <span className="invoice-detail-gray-text">
                {invoiceData.description}
              </span>
            </div>
            <div className="invoice-detail-info-sender-address invoice-detail-gray-text">
              <span>{invoiceData.senderAddress.street}</span>
              <span>{invoiceData.senderAddress.city}</span>
              <span>{invoiceData.senderAddress.postCode}</span>
              <span>{invoiceData.senderAddress.country}</span>
              <span></span>
              <span></span>
            </div>
            <div className="invoice-detail-info-date">
              <span className="invoice-detail-gray-text">Invoice Date</span>
              <span
                className={`heading-font-s1
                ${
                  lightSwitch
                    ? "invoice-detail-black-text"
                    : "invoice-detail-white-text"
                }
              `}
              >
                {`${invoiceData.createdAt.slice(0, 4)}-${
                  months[parseInt(invoiceData.createdAt.slice(5, 7)) - 1]
                }-${invoiceData.createdAt.slice(8)}`}
              </span>
            </div>
            <div className="invoice-detail-info-payment-due">
              <span className="invoice-detail-gray-text">Payment Due</span>
              <span
                className={`heading-font-s1 ${
                  lightSwitch
                    ? "invoice-detail-black-text"
                    : "invoice-detail-white-text"
                }`}
              >
                {`${invoiceData.paymentDue.slice(0, 4)}-${
                  months[parseInt(invoiceData.paymentDue.slice(5, 7)) - 1]
                }-${invoiceData.paymentDue.slice(8)}`}
              </span>
            </div>
            <div className="invoice-detail-info-client invoice-detail-gray-text">
              <span>Bill To</span>
              <span
                className={`heading-font-s1 invoice-detail-black-text ${
                  lightSwitch
                    ? "invoice-detail-black-text"
                    : "invoice-detail-white-text"
                }`}
              >
                {invoiceData.clientName}
              </span>
              <span>{invoiceData.clientAddress.street}</span>
              <span>{invoiceData.clientAddress.city}</span>
              <span>{invoiceData.clientAddress.postCode}</span>
              <span>{invoiceData.clientAddress.country}</span>
            </div>
            <div className="invoice-detail-info-client-email">
              <span className="invoice-detail-gray-text">Sent To</span>
              <span
                className={`heading-font-s1 ${
                  lightSwitch
                    ? "invoice-detail-black-text"
                    : "invoice-detail-white-text"
                }`}
              >
                {invoiceData.clientEmail}
              </span>
            </div>
          </div>
          <div className={`invoice-detail-info-bottom`}>
            <div
              className={`invoice-detail-items ${
                lightSwitch
                  ? "invoice-detail-items-bright-mode"
                  : "invoice-detail-items-dark-mode"
              }`}
            >
              {generateItems()}
            </div>
            <div
              className={`invoice-detail-total-price-section ${
                lightSwitch
                  ? "invoice-detail-total-price-section-bright-mode"
                  : "invoice-detail-total-price-section-dark-mode"
              }`}
            >
              <span>Amount Due</span>
              <span className="heading-font-m">£{invoiceData.total}</span>
            </div>
          </div>
        </div>
        {generateActionButtonsForSmallScreen()}
      </div>
    </>
  );
};

export default InvoiceDetail;
