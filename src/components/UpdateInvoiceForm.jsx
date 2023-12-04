import "../styles/fonts.scss";
import "../styles/components/updateInvoiceForm.scss";
import { useDispatch, useSelector } from "react-redux";
import Label from "./inputs/Label";
import TextField from "./inputs/TextField";
import Calendar from "./inputs/Calendar";
import Dropdown from "./inputs/Dropdown";
import ItemList from "./ItemList";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import { updateInvoice } from "../redux/data";
import { closeDrawer } from "../redux/drawer";
import { useForm, Controller } from "react-hook-form";
import { hideModal } from "../redux/modal";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const UpdateInvoiceForm = ({ formActionButtonsWrapperClassName }) => {
  const lightSwitch = useSelector((state) => state.lightSwitch.value);
  const screenDimensions = useSelector((state) => state.screenDimensions.value);
  const { invoiceId } = useParams();
  const invoiceData = useSelector((state) => state.data.value).find(
    (invoice) => invoice.id === invoiceId
  );
  console.log("invoice data", invoiceData);
  const dispatch = useDispatch();
  const paymentTermsOptions = [
    "Net 1 Day",
    "Net 7 Days",
    "Net 14 Days",
    "Net 30 Days",
  ];
  const messageForRequiredInput = "can't be empty";
  const form = useForm({
    defaultValues: {
      id: invoiceData.id,
      createdAt: invoiceData.createdAt,
      paymentDue: invoiceData.paymentDue,
      description: invoiceData.description,
      paymentTerms: invoiceData.paymentTerms,
      clientName: invoiceData.clientName,
      clientEmail: invoiceData.clientEmail,
      status: invoiceData.status,
      senderAddress: {
        street: invoiceData.senderAddress.street,
        city: invoiceData.senderAddress.city,
        postCode: invoiceData.senderAddress.postCode,
        country: invoiceData.senderAddress.country,
      },
      clientAddress: {
        street: invoiceData.clientAddress.street,
        city: invoiceData.clientAddress.city,
        postCode: invoiceData.clientAddress.postCode,
        country: invoiceData.clientAddress.country,
      },
      items: invoiceData.items,
      total: invoiceData.total,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = form;

  useEffect(() => {
    reset();
  }, []);
  const onSubmit = (data) => {
    data.total = data.items.reduce(
      (accumulator, item) => accumulator + item.total,
      0
    );
    dispatch(updateInvoice({ updatedInvoice: data }));
    dispatch(closeDrawer());
    dispatch(hideModal());
  };

  const cancelUpdate = () => {
    dispatch(closeDrawer());
    dispatch(hideModal());
    reset();
  };

  const generateForm = () => {
    if (screenDimensions.width > 750) {
      return (
        <form className={`update-invoice-form`}>
          <h2
            className={`heading-font-m  update-invoice-form-heading
                                ${
                                  lightSwitch
                                    ? "update-invoice-form-heading-bright-mode"
                                    : "update-invoice-form-heading-dark-mode"
                                }`}
          >
            Edit #{invoiceId}
          </h2>
          <fieldset>
            <span className="heading-font-s1 update-invoice-form-section-title">
              Bill From
            </span>
            <Label
              content="Street Address"
              errorMessage={errors?.senderAddress?.street?.message}
              error={!!errors?.senderAddress?.street?.message}
            />
            <TextField
              {...register("senderAddress.street", {
                required: messageForRequiredInput,
              })}
              error={!!errors?.senderAddress?.street?.message}
            />
            <div className="br"></div>
            <div className="update-invoice-form-3-fields-wrapper">
              <div>
                <Label content="City" error={!!errors?.senderAddress?.city} />
                <TextField
                  {...register("senderAddress.city", {
                    required: true,
                  })}
                  error={!!errors?.senderAddress?.city}
                />
              </div>
              <div>
                <Label
                  content="Postal Code"
                  error={!!errors?.senderAddress?.postCode}
                />
                <TextField
                  {...register("senderAddress.postCode", {
                    required: true,
                  })}
                  error={!!errors?.senderAddress?.postCode}
                />
              </div>
              <div>
                <Label
                  content="Country"
                  error={!!errors?.senderAddress?.country}
                />
                <TextField
                  {...register("senderAddress.country", {
                    required: true,
                  })}
                  error={!!errors?.senderAddress?.country}
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <span className="heading-font-s1 update-invoice-form-section-title">
              Bill To
            </span>
            <Label
              content="Client's Name"
              errorMessage={errors?.clientName?.message}
              error={!!errors?.clientName}
            />
            <TextField
              {...register("clientName", {
                required: messageForRequiredInput,
              })}
              error={!!errors?.clientName}
            />
            <div className="br"></div>
            <Label
              content="Client's Email"
              errorMessage={errors?.clientEmail?.message}
              error={!!errors?.clientEmail}
            />
            <TextField
              type="email"
              {...register("clientEmail", {
                required: messageForRequiredInput,
              })}
              error={!!errors?.clientEmail}
            />
            <div className="br"></div>
            <Label
              content="Street Address"
              errorMessage={errors?.clientAddress?.street?.message}
              error={!!errors?.clientAddress?.street}
            />
            <TextField
              {...register("clientAddress.street", {
                required: messageForRequiredInput,
              })}
              error={!!errors?.clientAddress?.street}
            />
            <div className="br"></div>
            <div className="update-invoice-form-3-fields-wrapper">
              <div>
                <Label content="City" error={!!errors?.clientAddress?.city} />
                <TextField
                  {...register("clientAddress.city", {
                    required: true,
                  })}
                  error={!!errors?.clientAddress?.city}
                />
              </div>
              <div>
                <Label
                  content="Postal Code"
                  error={!!errors?.clientAddress?.postCode}
                />
                <TextField
                  {...register("clientAddress.postCode", {
                    required: true,
                  })}
                  error={!!errors?.clientAddress?.postCode}
                />
              </div>
              <div>
                <Label
                  content="Country"
                  error={!!errors?.clientAddress?.country}
                />
                <TextField
                  {...register("clientAddress.country", {
                    required: true,
                  })}
                  error={!!errors?.clientAddress?.country}
                />
              </div>
            </div>
            <div className="update-invoice-form-2-fields-wrapper">
              <div>
                <Label content="Invoice Date" />
                <Controller
                  name="paymentDue"
                  control={control}
                  render={({ field }) => (
                    <Calendar value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
              <div>
                <Label content="Payment Terms" />
                <Controller
                  name="paymentTerms"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      onChange={field.onChange}
                      options={paymentTermsOptions}
                      selectedValue={field.value}
                    />
                  )}
                />
              </div>
            </div>
            <Label
              content="Project Description"
              error={!!errors?.description}
              errorMessage={errors?.description?.message}
            />
            <TextField
              {...register("description", {
                required: messageForRequiredInput,
              })}
              error={!!errors?.description}
            />
          </fieldset>
          <fieldset>
            <ItemList form={form} />
          </fieldset>
        </form>
      );
    } else {
      return (
        <form className={`update-invoice-form`}>
          <h2
            className={`heading-font-m  update-invoice-form-heading
                                ${
                                  lightSwitch
                                    ? "update-invoice-form-heading-bright-mode"
                                    : "update-invoice-form-heading-dark-mode"
                                }`}
          >
            New Invoice
          </h2>
          <fieldset>
            <span className="heading-font-s1 update-invoice-form-section-title">
              Bill From
            </span>
            <Label
              content="Street Address"
              errorMessage={errors?.senderAddress?.street?.message}
              error={!!errors?.senderAddress?.street?.message}
            />
            <TextField
              {...register("senderAddress.street", {
                required: messageForRequiredInput,
              })}
              error={!!errors?.senderAddress?.street?.message}
            />
            <div className="br"></div>
            <div className="update-invoice-form-2-fields-wrapper">
              <div>
                <Label content="City" error={!!errors?.senderAddress?.city} />
                <TextField
                  {...register("senderAddress.city", {
                    required: true,
                  })}
                  error={!!errors?.senderAddress?.city}
                />
              </div>
              <div>
                <Label
                  content="Postal Code"
                  error={!!errors?.senderAddress?.postCode}
                />
                <TextField
                  {...register("senderAddress.postCode", {
                    required: true,
                  })}
                  error={!!errors?.senderAddress?.postCode}
                />
              </div>
            </div>
            <div className="br"></div>
            <div>
              <Label
                content="Country"
                error={!!errors?.senderAddress?.country}
              />
              <TextField
                {...register("senderAddress.country", {
                  required: true,
                })}
                error={!!errors?.senderAddress?.country}
              />
            </div>
          </fieldset>
          <fieldset>
            <span className="heading-font-s1 update-invoice-form-section-title">
              Bill To
            </span>
            <Label
              content="Client's Name"
              errorMessage={errors?.clientName?.message}
              error={!!errors?.clientName}
            />
            <TextField
              {...register("clientName", {
                required: messageForRequiredInput,
              })}
              error={!!errors?.clientName}
            />
            <div className="br"></div>
            <Label
              content="Client's Email"
              errorMessage={errors?.clientEmail?.message}
              error={!!errors?.clientEmail}
            />
            <TextField
              type="email"
              {...register("clientEmail", {
                required: messageForRequiredInput,
              })}
              error={!!errors?.clientEmail}
            />
            <div className="br"></div>
            <Label
              content="Street Address"
              errorMessage={errors?.clientAddress?.street?.message}
              error={!!errors?.clientAddress?.street}
            />
            <TextField
              {...register("clientAddress.street", {
                required: messageForRequiredInput,
              })}
              error={!!errors?.clientAddress?.street}
            />
            <div className="br"></div>
            <div className="update-invoice-form-2-fields-wrapper">
              <div>
                <Label content="City" error={!!errors?.clientAddress?.city} />
                <TextField
                  {...register("clientAddress.city", {
                    required: true,
                  })}
                  error={!!errors?.clientAddress?.city}
                />
              </div>
              <div>
                <Label
                  content="Postal Code"
                  error={!!errors?.clientAddress?.postCode}
                />
                <TextField
                  {...register("clientAddress.postCode", {
                    required: true,
                  })}
                  error={!!errors?.clientAddress?.postCode}
                />
              </div>
            </div>
            <div className="br"></div>
            <div>
              <Label
                content="Country"
                error={!!errors?.clientAddress?.country}
              />
              <TextField
                {...register("clientAddress.country", {
                  required: true,
                })}
                error={!!errors?.clientAddress?.country}
              />
              <div className="br"></div>
            </div>
            <div>
              <Label content="Invoice Date" />
              <Controller
                name="paymentDue"
                control={control}
                render={({ field }) => (
                  <Calendar value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
            <div>
              <Label content="Payment Terms" />
              <Controller
                name="paymentTerms"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    onChange={field.onChange}
                    options={paymentTermsOptions}
                    selectedValue={field.value}
                  />
                )}
              />
            </div>
            <Label
              content="Project Description"
              error={!!errors?.description}
              errorMessage={errors?.description?.message}
            />
            <TextField
              {...register("description", {
                required: messageForRequiredInput,
              })}
              error={!!errors?.description}
            />
          </fieldset>
          <fieldset>
            <ItemList form={form} />
          </fieldset>
        </form>
      );
    }
  };

  return (
    <>
      {generateForm()}
      <div className="update-invoice-form-action-buttons-z-index-container">
        <div
          className={`update-invoice-form-action-buttons-wrapper 
                    ${
                      lightSwitch
                        ? "update-invoice-form-action-buttons-wrapper-bright-mode"
                        : "update-invoice-form-action-buttons-wrapper-dark-mode"
                    } 
                    ${formActionButtonsWrapperClassName}`}
        >
          <SecondaryButton onClick={cancelUpdate} text="Cancel" />
          <PrimaryButton
            onClick={() => handleSubmit(onSubmit)()}
            className="update-invoice-form-save-changes-button"
            text="Save Changes"
          />
        </div>
      </div>
    </>
  );
};

export default UpdateInvoiceForm;
