import "../../styles/components/buttons/button4.scss"
export default function Button4({isBrightMode=true}) {
    return (
    <button 
    className={`btn4 heading-font-s1 ${isBrightMode ? "btn4-bright-mode" : "btn4-dark-mode"}`}
    >
        <span className="btn3-text">Save As Draft</span>
    </button>
    )
}