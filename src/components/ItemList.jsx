import { useState } from "react";
import "../styles/components/itemList.scss";
import "../styles/fonts.scss"
import AddNewItemButton from "./buttons/AddNewItemButton";
import { useSelector } from "react-redux";
import TextField from "./inputs/TextField";
import trashCanIcon from "../assets/icon-delete.svg";
import { round } from "lodash";

export default function ItemList({addItem, items,updateItemName, updateItemQuantity,updateItemPrice, deleteItem}) {
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    // const [items, setItems] = useState([]);

    // const addNewItem = () => {
    //     setItems([...items, {
    //         name: "",
    //         quantity: null,
    //         price: null
    //     }])
    // }

    const generateItems = () => {
        return items.map((item, i) => {
            // const deleteItem = (indexToRemove) => {
            //     setItems((prevItems) =>{
            //         return prevItems.filter((_, index) => index !== indexToRemove);
            //     })
            // }
            // const updateItemName = (indexToUpdate, name) => {
            //     setItems(prevItems => {
            //         const updatedItems = [...prevItems];
            //         updatedItems[indexToUpdate] = {...updatedItems[indexToUpdate], name: name};
            //         return updatedItems;
            //     })
            // }

            // const updateItemQuantity = (indexToUpdate, quantity) => {
            //     setItems(prevItems => {
            //         const updatedItems = [...prevItems];
            //         if(isNaN(quantity)) {
            //             return updatedItems;
            //         }
            //         updatedItems[indexToUpdate] = {...updatedItems[indexToUpdate], quantity: quantity};
            //         return updatedItems;
            //     })
            // }

            // const updateItemPrice = (indexToUpdate, price) => {
            //     setItems(prevItems => {
            //         const updatedItems = [...prevItems];
            //         if(isNaN(price)) {
            //             return updatedItems;
            //         }
            //         updatedItems[indexToUpdate] = {...updatedItems[indexToUpdate], price: price};
            //         return updatedItems;
            //     })
            // }
            if(i === 0) {
                return (
                    <div className={`item-wrapper`} key={i}>
                        <div>
                            <span className={`item-attribute ${lightSwitch ? "item-attribute-bright-mode" : "item-attribute-dark-mode"}`}>Item Name</span>
                            <TextField className="item-name" onChange ={(name) => updateItemName(i, name)} value={item.name}/>
                        </div>
                        <div>
                            <span className={`item-attribute ${lightSwitch ? "item-attribute-bright-mode" : "item-attribute-dark-mode"}`}>Qty.</span>
                            <TextField className="item-quantity" onChange={(quantity) => updateItemQuantity(i, quantity)} value={item.quantity} type="number"/>
                        </div>
                        <div>
                            <span className={`item-attribute ${lightSwitch ? "item-attribute-bright-mode" : "item-attribute-dark-mode"}`}>Price</span>
                            <TextField className="item-price" onChange={(price) => updateItemPrice(i, price)} value={item.price} type="number"/>
                        </div>
                        <div>
                            <span className={`item-attribute ${lightSwitch ? "item-attribute-bright-mode" : "item-attribute-dark-mode"}`}>Total</span>
                            <span className={`item-total-price ${lightSwitch ? "item-total-price-bright-mode" : "item-total-price-dark-mode"}`}>{round(item.price * item.quantity, 2)}</span>
                        </div>
                        <div>
                            <span className="item-delete-icon"><img alt="trash can icon" src={trashCanIcon} onClick={() => deleteItem(i)} /></span>
                        </div>
                    </div>
                )
            } else {

                return  <div className={`item-wrapper`} key={i}>
                            <TextField className="item-name" onChange ={(name) => updateItemName(i, name)} value={item.name}/>
                            <TextField className="item-quantity" onChange={(quantity) => updateItemQuantity(i, quantity)} value={item.quantity} type="number"/>
                            <TextField className="item-price" onChange={(price) => updateItemPrice(i, price)} value={item.price} type="number"/>
                            <span className={`item-total-price ${lightSwitch ? "item-total-price-bright-mode" : "item-total-price-dark-mode"}`}>{round(item.price * item.quantity, 2)}</span>
                            <span className="item-delete-icon"><img alt="trash can icon" src={trashCanIcon} onClick={() => deleteItem(i)} /></span>
                        </div>
            }

        })
    }


    return (
        <div className={`heading-font-s1 item-list ${lightSwitch ? "item-list-bright-mode" : "item-list-dark-mode"}`}>
            <h3 className={`item-list-header ${lightSwitch ? "item-list-header-bright-mode" : "item-list-header-dark-mode"}`}>Item List</h3>
            {generateItems()}
            <AddNewItemButton onClick={addItem} />
        </div>
    )
}