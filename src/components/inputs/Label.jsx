import "../../styles/fonts.scss";
import "../../styles/components/inputs/label.scss";

export default function Label({content= ""}) {
    return (
        <label className="label body-font-1">{content}</label>
    )
}