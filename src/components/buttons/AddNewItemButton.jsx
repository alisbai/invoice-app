import "../../styles/components/buttons/addNewItemButton.scss"
export default function AddNewItemButton({className, type="button", onClick}) {
    return (
    <button className={"add-new-item-button heading-font-s1 " + className} 
    type={type}
    onClick={onClick}
    >
        <span className="add-new-item-button-text">+ Add New Item</span>
    </button>
    )
}