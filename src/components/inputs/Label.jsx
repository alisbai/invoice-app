import "../../styles/fonts.scss";
import "../../styles/components/inputs/label.scss";

export default function Label({content= "", isBrightMode = true}) {
    return (
        <label 
        className={`body-font-1 ${isBrightMode ? "label-bright-mode": "label-dark-mode"}`}
        >{content}
        </label>
    )
}