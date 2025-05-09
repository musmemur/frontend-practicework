import './index.scss';
import React from "react";
import userPhotoPlaceholder from "../../shared/assets/user-photo.svg";
import {ApiFullUserResponse} from "../../entities/ApiFullUserResponse.ts";

type UserCardProps = {
    user: ApiFullUserResponse;
}

const UserCard: React.FC<UserCardProps> = ({user}) => {
    return(
        <div className="profile-card">
            <div className="profile-picture-container user-page-profile-picture-container">
                <img src={user.userPhoto || userPhotoPlaceholder} id="user-page-picture"
                     alt="плейсхолдер аватарки пользователя"/>
            </div>
            <div className="profile-name">
                {user.username}
            </div>
        </div>
    )
}

export default UserCard;