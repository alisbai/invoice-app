import "../styles/components/itemList.scss";
import "../styles/fonts.scss"
import AddNewItemButton from "./buttons/AddNewItemButton";
import { useSelector } from "react-redux";
import TextField from "./inputs/TextField";
import trashCanIcon from "../assets/icon-delete.svg";
import { round } from "lodash";

export default function ItemList({form}) {
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    const screenDimensions = useSelector(state => state.screenDimensions.value);

    const {register, setValue, watch, formState, formState: {errors}} = form;
    console.log(formState);

    const items = watch("items", []);

    const addNewItem = () => {
        const newItem = {
            name: "",
            quantity: null,
            price: null,
            total: null
        }
        setValue("items",[...items, newItem] );
    }


    const deleteItem = (indexToRemove) => {
        const updatedItems = [...items].filter((_, index) => index !== indexToRemove);
        setValue("items", updatedItems);
    }

    const calculateTotal = (index) => {
        const item = items[index];
        const price = item.price;
        const quantity = item.quantity;
        if(price < 0 || quantity < 0) {
            setValue(`items.${index}.total`, null);
            return
        }
        const total =round(price * quantity, 2);
        setValue(`items.${index}.total`, total? total: null);
    }

    const generateItemsForWideScreen = () => {
        return items.map((item, i) => {
                if(i === 0) {
                    return (
                        <div 
                        className={`item-wrapper`} 
                        key={i}
                        >
                            <div>
                                <span 
                                className={`item-attribute 
                                ${lightSwitch ? "item-attribute-bright-mode" : "item-attribute-dark-mode"}`}
                                >Item Name</span>
                                <TextField 
                                className="item-name" 
                                {...register(`items.${i}.name`, {
                                    required: true
                                })}
                                error={!!errors?.items?.[i]?.name}
                                />
                            </div>
                            <div>
                                <span 
                                className={`item-attribute ${lightSwitch ? "item-attribute-bright-mode" : "item-attribute-dark-mode"}`}
                                >Qty.</span>
                                <TextField 
                                className="item-quantity" type="number" 
                                {...register(`items.${i}.quantity`, 
                                    {
                                        required: true,
                                        valueAsNumber: true, 
                                        min: {
                                            value: 1, 
                                            message:"value must be one or more"
                                            }, 
                                        onChange: () => calculateTotal(i)
                                    }
                                )}
                                error={!!errors?.items?.[i]?.quantity}
                                />
                            </div>
                            <div>
                                <span 
                                className={`item-attribute ${lightSwitch ? "item-attribute-bright-mode" : "item-attribute-dark-mode"}`}
                                >Price</span>
                                <TextField 
                                className="item-price" type="number" 
                                {...register(`items.${i}.price`, 
                                    {
                                        required: true,
                                        valueAsNumber: true, 
                                        min: 1, 
                                        onChange: () => calculateTotal(i)
                                    })
                                } 
                                error={!!errors?.items?.[i]?.price}
                                />
                            </div>
                            <div>
                                <span 
                                className={`item-attribute ${lightSwitch ? "item-attribute-bright-mode" : "item-attribute-dark-mode"}`}
                                >Total</span>
                                <span 
                                className={`item-total-price ${lightSwitch ? "item-total-price-bright-mode" : "item-total-price-dark-mode"}`}
                                >{item.total && `£${item.total}`}</span>
                            </div>
                            <div>
                                <span 
                                className="item-delete-icon"
                                >
                                    <img 
                                    alt="trash can icon" 
                                    src={trashCanIcon} 
                                    onClick={() => deleteItem(i)} 
                                    />
                                </span>
                            </div>
                        </div>
                    )
                } else {
    
                    return  <div 
                            className={`item-wrapper`} 
                            key={i}
                            >
                                <TextField 
                                className="item-name" 
                                {...register(`items.${i}.name`, {
                                    required: true
                                })}
                                error={!!errors?.items?.[i]?.name}
                                />
                                <TextField 
                                className="item-quantity"
                                {...register(`items.${i}.quantity`, 
                                    {
                                        valueAsNumber: true,
                                        required: true,
                                        min: {
                                            value: 1,
                                            message: "value must be one or more"
                                        },
                                        onChange: () => calculateTotal(i)
                                    })}
                                error={!!errors?.items?.[i]?.quantity}
                                />
                                <TextField 
                                className="item-price" 
                                {...register(`items.${i}.price`, 
                                    {
                                        required: true,
                                        valueAsNumber: true,
                                        min: 1,
                                        onChange: () => calculateTotal(i)
                                    })
                                }
                                error={!!errors?.items?.[i]?.price}
                                />
                                <span 
                                className={`item-total-price ${lightSwitch ? "item-total-price-bright-mode" : "item-total-price-dark-mode"}`}
                                >{item.total && `£${item.total}`}</span>
                                <span 
                                className="item-delete-icon"
                                >
                                    <img 
                                    alt="trash can icon" 
                                    src={trashCanIcon} 
                                    onClick={() => deleteItem(i)} 
                                    />
                                </span>
                            </div>
                }
    
            })
    }

    const generateItemsForSmallScreen = () => {
        return (
            items.map((item, i) => (
            <div 
            className={`item-wrapper`} 
            key={i}
            >
                <div className="item-name-wrapper">
                    <span 
                    className={`item-attribute 
                    ${lightSwitch ? "item-attribute-bright-mode" : "item-attribute-dark-mode"}`}
                    >Item Name</span>
                    <TextField 
                    className="item-name" 
                    {...register(`items.${i}.name`, {
                        required: true
                    })}
                    error={!!errors?.items?.[i]?.name}
                    />
                </div>
                <div className="br"></div>
                <div className="item-price-quantity-total-delete-wrapper">
                    
                <div>
                    <span 
                    className={`item-attribute ${lightSwitch ? "item-attribute-bright-mode" : "item-attribute-dark-mode"}`}
                    >Qty.</span>
                    <TextField 
                    className="item-quantity" type="number" 
                    {...register(`items.${i}.quantity`, 
                        {
                            required: true,
                            valueAsNumber: true, 
                            min: {
                                value: 1, 
                                message:"value must be one or more"
                                }, 
                            onChange: () => calculateTotal(i)
                        }
                    )}
                    error={!!errors?.items?.[i]?.quantity}
                    />
                </div>
                <div>
                    <span 
                    className={`item-attribute ${lightSwitch ? "item-attribute-bright-mode" : "item-attribute-dark-mode"}`}
                    >Price</span>
                    <TextField 
                    className="item-price" type="number" 
                    {...register(`items.${i}.price`, 
                        {
                            required: true,
                            valueAsNumber: true, 
                            min: 1, 
                            onChange: () => calculateTotal(i)
                        })
                    } 
                    error={!!errors?.items?.[i]?.price}
                    />
                </div>
                <div className="item-total-price-wrapper">
                    <span 
                    className={`item-attribute ${lightSwitch ? "item-attribute-bright-mode" : "item-attribute-dark-mode"}`}
                    >Total</span>
                    <span 
                    className={`item-total-price ${lightSwitch ? "item-total-price-bright-mode" : "item-total-price-dark-mode"}`}
                    >{item.total && `£${item.total}`}</span>
                </div>
                <div>
                    <span 
                    className="item-delete-icon"
                    >
                        <img 
                        alt="trash can icon" 
                        src={trashCanIcon} 
                        onClick={() => deleteItem(i)} 
                        />
                    </span>
                </div>
                </div>
            </div>
            ))
        )
    }

    const generateItems = () => {
        if(screenDimensions.width > 675) {
            return generateItemsForWideScreen()
            
        } else {
            return  generateItemsForSmallScreen();
        }
    }


    return (
        <div 
        className={`heading-font-s1 item-list ${lightSwitch ? "item-list-bright-mode" : "item-list-dark-mode"}`}
        >
            <h3 
            className={`item-list-header ${lightSwitch ? "item-list-header-bright-mode" : "item-list-header-dark-mode"}`}
            >Item List</h3>
            {generateItems()}
            <AddNewItemButton 
                onClick={addNewItem} 
            />
        </div>
    )
}