import { useSelector } from "react-redux";
import "../styles/components/tag.scss";
import { capitalize } from "lodash";

export default function Tag({value}) {
    const lightSwitch = useSelector(state => state.lightSwitch.value);
    return (
        <div 
        className={`tag tag-${value} 
        ${lightSwitch? `tag-${value}-bright-mode`: `tag-${value}-dark-mode`}`}
        >
        ● {capitalize(value)}</div>
    )
}