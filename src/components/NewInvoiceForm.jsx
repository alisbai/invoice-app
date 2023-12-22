import "../styles/fonts.scss";
import "../styles/components/newInvoiceForm.scss";
import { useDispatch, useSelector } from "react-redux";
import Label from "./inputs/Label";
import TextField from "./inputs/TextField";
import Calendar from "./inputs/Calendar";
import Dropdown from "./inputs/Dropdown";
import ItemList from "./ItemList";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import TertiaryButton from "./buttons/TertiaryButton";
import { padStart } from "lodash";
import { addInvoice } from "../redux/data";
import { closeDrawer } from "../redux/drawer";
import { useForm, Controller } from "react-hook-form";
import { hideModal } from "../redux/modal";

export default function NewInvoiceFrom({ formActionButtonsWrapperClassName }) {
  const lightSwitch = useSelector((state) => state.lightSwitch.value);
  const screenDimensions = useSelector((state) => state.screenDimensions.value);
  const dispatch = useDispatch();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const paymentTermsOptions = [
    "Net 1 Day",
    "Net 7 Days",
    "Net 14 Days",
    "Net 30 Days",
  ];
  const messageForRequiredInput = "can't be empty";
  const form = useForm({
    defaultValues: {
      id: "",
      createdAt: "",
      paymentDue: `${year}-${padStart(month + 1, 2, "0")}-${padStart(
        day,
        2,
        "0"
      )}`,
      description: "",
      paymentTerms: 1,
      clientName: "",
      clientEmail: "",
      status: "",
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      items: [],
      total: null,
    },
  });
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = form;

  const generateId = () => {
    return (
      Date.now().toString(36).slice(0, 2).toUpperCase() +
      Math.floor(Math.random() * 10000)
    );
  };

  const onSubmit = (data) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    data.createdAt = `${year}-${padStart(month + 1, 2, "0")}-${padStart(
      day,
      2,
      "0"
    )}`;
    data.id = generateId();
    data.total = data.items.reduce(
      (accumulator, item) => accumulator + item.total,
      0
    );
    dispatch(addInvoice({ invoiceToAdd: data }));
    dispatch(closeDrawer());
    dispatch(hideModal());
    reset();
  };

  const saveAsPaid = () => {
    setValue("status", "paid");
    handleSubmit(onSubmit)();
  };

  const saveAsDraft = () => {
    setValue("status", "draft");
    handleSubmit(onSubmit)();
  };

  const generateForm = () => {
    if (screenDimensions.width > 675) {
      return (
        <form className={`new-invoice-form`}>
          <h2
            className={`heading-font-m  new-invoice-form-heading
                                ${
                                  lightSwitch
                                    ? "new-invoice-form-heading-bright-mode"
                                    : "new-invoice-form-heading-dark-mode"
                                }`}
          >
            New Invoice
          </h2>
          <fieldset>
            <span className="heading-font-s1 new-invoice-form-section-title">
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
            <div className="new-invoice-form-3-fields-wrapper">
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
            <span className="heading-font-s1 new-invoice-form-section-title">
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
            <div className="new-invoice-form-3-fields-wrapper">
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
            <div className="new-invoice-form-2-fields-wrapper">
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
        <form className={`new-invoice-form`}>
          <h2
            className={`heading-font-m  new-invoice-form-heading
                                ${
                                  lightSwitch
                                    ? "new-invoice-form-heading-bright-mode"
                                    : "new-invoice-form-heading-dark-mode"
                                }`}
          >
            New Invoice
          </h2>
          <fieldset>
            <span className="heading-font-s1 new-invoice-form-section-title">
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
            <div className="new-invoice-form-2-fields-wrapper">
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
                    pattern: /^\d+$/,
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
            <span className="heading-font-s1 new-invoice-form-section-title">
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
            <div className="new-invoice-form-2-fields-wrapper">
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
                    pattern: /^\d+$/,
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
      <div className="new-invoice-form-action-buttons-z-index-container">
        <div
          className={`new-invoice-form-action-buttons-wrapper 
                    ${
                      lightSwitch
                        ? "new-invoice-form-action-buttons-wrapper-bright-mode"
                        : "new-invoice-form-action-buttons-wrapper-dark-mode"
                    } 
                    ${formActionButtonsWrapperClassName}`}
        >
          <TertiaryButton
            onClick={() => {
              reset();
              dispatch(closeDrawer());
              dispatch(hideModal());
            }}
            className="new-invoice-form-discard-button"
            text="Discard"
          />
          <SecondaryButton onClick={saveAsDraft} text="Save As Draft" />
          <PrimaryButton
            onClick={saveAsPaid}
            className="new-invoice-form-save-and-send-button"
            text="Save & Send"
          />
        </div>
      </div>
    </>
  );
}
