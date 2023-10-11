import "../styles/components/userBar.scss"
import LightSwitchWrapper from "./LightSwitchWrapper";
import Logo from "./Logo";
import UserPictureWrapper from "./UserPictureWrapper";

export default function UserBar() {
    return (
        <nav className={`user-bar`}>
            <Logo />
            <LightSwitchWrapper />
            <UserPictureWrapper />
        </nav>
    )
}