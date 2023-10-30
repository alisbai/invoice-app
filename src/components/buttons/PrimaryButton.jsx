import "../../styles/components/buttons/primaryButton.scss"
export default function PrimaryButton({text, type="button", className}) {
    return (
    <button 
        className={`primary-button heading-font-s1 ${className}`}
        type={type}
    >
        <span className={"primary-button-text"}>{text}</span>
    </button>
    )
}