import { useState } from "react";
import "../styles/components/itemList.scss";
import "../styles/fonts.scss"
import AddNewItemButton from "./buttons/AddNewItemButton";
import { useSelector } from "react-redux";
import TextField from "./inputs/TextField";
import trashCanIcon from "../assets/icon-delete.svg";

export default function ItemList() {
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    const [items, setItems] = useState([
        {
            name: "some item",
            quantity: 2,
            price: 200
        },
        {
            name: "another item",
            quantity: 2,
            price: 200
        },
        {
            name: "third item",
            quantity: 2,
            price: 200
        },
    ]);

    const addNewItem = () => {
        setItems([...items, {
            name: "",
            quantity: null,
            price: null
        }])
    }

    const generateItems = () => {
        return items.map((item, i) => {
            const deleteItem = (indexToRemove) => {
                setItems((prevItems) =>{
                    return prevItems.filter((_, index) => index !== indexToRemove);
                })
            }
            const updateItemName = (indexToUpdate, name) => {
                setItems(prevItems => {
                    const updatedItems = [...prevItems];
                    updatedItems[indexToUpdate] = {...updatedItems[indexToUpdate], name: name};
                    return updatedItems;
                })
            }

            const updateItemQuantity = (indexToUpdate, quantity) => {
                setItems(prevItems => {
                    const updatedItems = [...prevItems];
                    if(isNaN(quantity)) {
                        return updatedItems;
                    }
                    updatedItems[indexToUpdate] = {...updatedItems[indexToUpdate], quantity: quantity};
                    return updatedItems;
                })
            }

            const updateItemPrice = (indexToUpdate, price) => {
                setItems(prevItems => {
                    const updatedItems = [...prevItems];
                    if(isNaN(price)) {
                        return updatedItems;
                    }
                    updatedItems[indexToUpdate] = {...updatedItems[indexToUpdate], price: price};
                    return updatedItems;
                })
            }
            return  <div className={`item-wrapper`} key={i}>
                        <TextField className="item-name" onChange ={(name) => updateItemName(i, name)} value={item.name}/>
                        <TextField className="item-quantity" onChange={(quantity) => updateItemQuantity(i, quantity)} value={item.quantity} type="number"/>
                        <TextField className="item-price" onChange={(price) => updateItemPrice(i, price)} value={item.price} type="number"/>
                        <span className={`item-total-price ${lightSwitch ? "item-total-price-bright-mode" : "item-total-price-dark-mode"}`}>{item.price * item.quantity}</span>
                        <span className="item-delete-icon"><img alt="trash can icon" src={trashCanIcon} onClick={() => deleteItem(i)} /></span>
                    </div>
        })
    }


    return (
        <div className={`heading-font-s1 item-list ${lightSwitch ? "item-list-bright-mode" : "item-list-dark-mode"}`}>
            <h3 className={`item-list-header ${lightSwitch ? "item-list-header-bright-mode" : "item-list-header-dark-mode"}`}>Item List</h3>
            <div>
                <div className="body-font-1 item-attributes">
                    <span className="item-attribute-name">Item Name</span>
                    <span className="item-attribute-quantity">Qty.</span>
                    <span className="item-attribute-price">Price</span>
                    <span className="item-attribute-total">Total</span>
                    <span className="item-attribute-delete"></span>
                </div>
                {generateItems()}
            </div>
            <AddNewItemButton onClick={addNewItem} />
        </div>
    )
}