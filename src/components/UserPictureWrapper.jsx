import "../styles/components/userPictureWrapper.scss";
import userPicture from "../assets/image-avatar.jpg";
export default function UserPictureWrapper() {

    return <div className="user-picture-wrapper">
            <img className="user-image" alt="user" src={userPicture} />
    </div>
}