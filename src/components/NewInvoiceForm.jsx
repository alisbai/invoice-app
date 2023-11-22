import "../styles/fonts.scss";
import "../styles/components/newInvoiceForm.scss";
import { useDispatch ,useSelector } from "react-redux";
import Label from "./inputs/Label";
import TextField from "./inputs/TextField";
import Calendar from "./inputs/Calendar";
import Dropdown from "./inputs/Dropdown";
import ItemList from "./ItemList";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import TertiaryButton from "./buttons/TertiaryButton";
import { useEffect, useState } from "react";
import { padStart } from "lodash";
import { addInvoice } from "../redux/data";
import { closeDrawer } from "../redux/drawer";

export default function NewInvoiceFrom({formActionButtonsWrapperClassName}) {
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    const dispatch = useDispatch();
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var day = currentDate.getDate();
    const paymentTermsOptions = ["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"];

    const [formData, setFormData] = useState({
        "id": "",
        "createdAt": "",
        "paymentDue": `${year}-${padStart(month + 1, 2, "0")}-${padStart(day, 2, "0")}`,
        "description": "",
        "paymentTerms": 1,
        "clientName": "",
        "clientEmail": "",
        "status": "",
        "senderAddress": {
        "street": "",
        "city": "",
        "postCode": "",
        "country": ""
        },
        "clientAddress": {
        "street": "",
        "city": "",
        "postCode": "",
        "country": ""
        },
        "items": [],
        "total": null
    });
    
    const updatePaymentDue = (selectedDate) => {
        const year = selectedDate.year;
        const month = selectedDate.month;
        const day = selectedDate.day;
        const newPaymentDue = `${year}-${padStart(month + 1, 2, "0")}-${padStart(day, 2, "0")}`;
        const newFormData = {...formData};
        newFormData.paymentDue = newPaymentDue;
        setFormData(newFormData);
    }
    const updatePaymentsTerm = (paymentTerm) => {
        const newFormData = {...formData};
        switch(paymentTerm) {
            case "Net 1 Day":
                newFormData.paymentTerms = 1;
                break;
            case "Net 7 Days":
                newFormData.paymentTerms = 7;
                break;
            case "Net 14 Days":
                newFormData.paymentTerms = 14;
                break;
            case "Net 30 Days":
                newFormData.paymentTerms = 30;
                break;
            default:
        }
        setFormData(newFormData);
    }
    const getPaymentTermsSelectedValueIndex = (selectedValue) => {
        switch(selectedValue) {
            case 1:
                return paymentTermsOptions.indexOf("Net 1 Day");
            case 7:
                return paymentTermsOptions.indexOf("Net 7 Days");
            case 14:
                return paymentTermsOptions.indexOf("Net 14 Days");
            case 30:
                return paymentTermsOptions.indexOf("Net 30 Days");
            default:
                console.log("couldn't find payment term option");
        }
    }

    const handleFormChange = (keys, value)  => {
        const newFormData = {...formData};
        let tempObj = newFormData;
        for(let i = 0; i < keys.length - 1; i++) {
            tempObj = tempObj[`${keys[i]}`];
        }
        tempObj[`${keys[keys.length - 1]}`] = value;
        setFormData(newFormData);
    }

    const addItem = () => {
        const newFormData = {...formData};
        newFormData.items.push({
            name: "",
            quantity: "",
            price: ""
        });
        setFormData(newFormData);
    }
    const deleteItem = (index) => {
        const newFormData= {...formData};
        newFormData.items.splice(index, 1);
        setFormData(newFormData);
    }
    const updateItemName = (indexToUpdate, name) => {
        const newFormData= {...formData};
        newFormData.items = [...formData.items];
        newFormData.items[indexToUpdate].name = name;
        setFormData(newFormData);
    }

    const updateItemQuantity = (indexToUpdate, quantity) => {
        const newFormData= {...formData};
        if(!isNaN(quantity)) {
            newFormData.items = [...formData.items];
            newFormData.items[indexToUpdate].quantity = parseInt(quantity);
            setFormData(newFormData);
        }
    }
    const updateItemPrice = (indexToUpdate, price) => {
        const newFormData= {...formData};
        if(!isNaN(price)) {
            newFormData.items = [...formData.items];
            newFormData.items[indexToUpdate].price = parseFloat(price);
            setFormData(newFormData);
        }
    }

    const resetForm = () => {
        setFormData({
            "id": "",
            "createdAt": "",
            "paymentDue": `${year}-${padStart(month + 1, 2, "0")}-${padStart(day, 2, "0")}`,
            "description": "",
            "paymentTerms": 1,
            "clientName": "",
            "clientEmail": "",
            "status": "",
            "senderAddress": {
            "street": "",
            "city": "",
            "postCode": "",
            "country": ""
            },
            "clientAddress": {
            "street": "",
            "city": "",
            "postCode": "",
            "country": ""
            },
            "items": [],
            "total": null
        })
    }

    const updateCreatedAtDate =() => {
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth();
        var day = currentDate.getDate();
        const newFormData = {...formData};
        newFormData.createdAt = `${year}-${padStart(month + 1, 2, "0")}-${padStart(day, 2, "0")}`
        return newFormData;
    }

    const generateId = () => {
        return Date.now().toString(36).slice(0, 2).toUpperCase() + Math.floor(Math.random() * 10000);
    }

    const saveFormData = (status) => {
        //update created at date.
        const newFormData = updateCreatedAtDate();
        // Generate id for the form Data.
        newFormData.id = generateId();
        // set form data status to paid;
        newFormData.status = status;
        // push formData to redux state.
        dispatch(addInvoice({invoiceToAdd: newFormData}));
    }

    const saveAsPaid = (e)=> {
        e.preventDefault();
        saveFormData("paid");
        // reset formData.
        resetForm();
    }

    const saveAsDraft = (e) => {
        e.preventDefault();
        saveFormData("draft");
        // reset formData.
        resetForm();
    }

    useEffect(()=> {
        setFormData(prevState => {
            prevState.total = prevState.items.reduce((accumulator , current) => {
                return accumulator + (current.price * current.quantity);
            }, 0)
            return prevState
        })
    }, [formData.items])

    console.log(formData);
    return (
        <>
            <form className={`new-invoice-form`}>
                <h2 
                    className={`heading-font-m  new-invoice-form-heading
                        ${lightSwitch ? "new-invoice-form-heading-bright-mode" : "new-invoice-form-heading-dark-mode"}`}
                >New Invoice</h2>
                <fieldset>
                    <span className="heading-font-s1 new-invoice-form-section-title">Bill From</span>
                    <Label content="Street Address" />
                    <TextField onChange={(value) => handleFormChange(["senderAddress", "street"], value)} value={formData.senderAddress.street} />
                    <div className="br"></div>
                    <div className="new-invoice-form-3-fields-wrapper">
                        <div>
                            <Label content="City" />
                            <TextField onChange={(value) => handleFormChange(["senderAddress", "city"], value)} value={formData.senderAddress.city} />
                        </div>
                        <div>
                            <Label content="Postal Code" />
                            <TextField onChange={(value) => handleFormChange(["senderAddress", "postCode"], value)} value={formData.senderAddress.postCode} />
                        </div>
                        <div>
                            <Label content="Country" />
                            <TextField onChange={(value) => handleFormChange(["senderAddress", "country"], value)} value={formData.senderAddress.country} />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <span className="heading-font-s1 new-invoice-form-section-title">Bill To</span>
                        <Label content="Client's Name" />
                        <TextField onChange={(value) => handleFormChange(["clientName"], value)} value={formData.clientName} />
                        <div className="br"></div>
                        <Label content="Client's Email" />
                        <TextField type="email" onChange={(value) => handleFormChange(["clientEmail"], value)} value={formData.clientEmail}/>
                        <div className="br"></div>
                        <Label content="Street Address" />
                        <TextField onChange={(value) => handleFormChange(["clientAddress", "street"], value)} value={formData.clientAddress.street} />
                        <div className="br"></div>
                    <div className="new-invoice-form-3-fields-wrapper">
                        <div>
                            <Label content="City" />
                            <TextField onChange={(value) => handleFormChange(["clientAddress", "city"], value)} value={formData.clientAddress.city} />
                        </div>
                        <div>
                            <Label content="Postal Code" />
                            <TextField onChange={(value) => handleFormChange(["clientAddress", "postCode"], value)} value={formData.clientAddress.postCode} />
                        </div>
                        <div>
                            <Label content="Country" />
                            <TextField onChange={(value) => handleFormChange(["clientAddress", "country"], value)} value={formData.clientAddress.country} />
                        </div>
                    </div>
                    <div className="new-invoice-form-2-fields-wrapper">
                        <div>
                            <Label content="Invoice Date" />
                            <Calendar 
                                selectedDate={
                                    {year: parseInt(formData.paymentDue.slice(0, 4)),
                                    month: parseInt(formData.paymentDue.slice(5, 7) - 1),
                                    day: parseInt(formData.paymentDue.slice(8, 10))} 
                                }
                                setSelectedDate= {updatePaymentDue}
                                onChange={(value) => handleFormChange(["paymentDue"], value)}
                            />
                        </div>
                        <div>
                            <Label content="Payment Terms" />
                            <Dropdown 
                            onChange={updatePaymentsTerm}
                            options={paymentTermsOptions}
                            selectedValue={ paymentTermsOptions[getPaymentTermsSelectedValueIndex(formData.paymentTerms)]}
                             />
                        </div>
                    </div>
                        <Label content="Project Description" />
                        <TextField onChange={(value) => handleFormChange(["description"], value)} value={formData.description} />
                </fieldset>
                <fieldset>
                    <ItemList 
                        items={formData.items} 
                        addItem={addItem} 
                        updateItemName={updateItemName}
                        updateItemQuantity={updateItemQuantity}
                        updateItemPrice={updateItemPrice}
                        deleteItem={deleteItem}    
                    />
                </fieldset>
            </form>
            <div className="form-action-buttons-z-index-container">
                <div 
                    className={`form-action-buttons-wrapper 
                    ${lightSwitch ? "form-action-buttons-wrapper-bright-mode" : "form-action-buttons-wrapper-dark-mode"} 
                    ${formActionButtonsWrapperClassName}`}
                >
                    <TertiaryButton onClick={() => {
                        resetForm();
                        dispatch(closeDrawer());
                        }} 
                        className="discard-button" 
                        text="Discard" 
                    />
                    <SecondaryButton onClick={saveAsDraft} text="Save As Draft" />
                    <PrimaryButton onClick={saveAsPaid} className="save-and-send-button" text="Save And Send" />
                </div>
            </div>
        </>
    )
}