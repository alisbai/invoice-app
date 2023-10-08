import "../../styles/components/buttons/button3.scss"
export default function Button3({isBrightMode=true}) {
    return (
    <button 
    className={`btn3 heading-font-s1 ${isBrightMode ? "btn3-bright-mode" : "btn3-dark-mode"}`}
    >
        <span className="btn3-text">Edit</span>
    </button>
    )
}