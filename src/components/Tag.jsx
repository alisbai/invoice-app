import { useSelector } from "react-redux";
import "../styles/components/tag.scss";
import { capitalize } from "lodash";
import "../styles/fonts.scss";

export default function Tag({ value }) {
  const lightSwitch = useSelector((state) => state.lightSwitch.value);
  return (
    <div
      className={`tag tag-${value} heading-font-s1
        ${lightSwitch ? `tag-${value}-bright-mode` : `tag-${value}-dark-mode`}`}
    >
      ● {capitalize(value)}
    </div>
  );
}
