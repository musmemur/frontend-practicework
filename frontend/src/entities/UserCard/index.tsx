import './userCard.css';
import {useEffect, useState} from "react";
import {ApiUserResponse} from "../../app/types/ApiUserResponse.ts";
import {fetchUserData} from "../../processes/fetchUserData.ts";

import userPhotoPlaceholder from "../../shared/assets/user-photo.svg";

export const UserCard = () => {
    const [user, setUser] = useState<ApiUserResponse | null>(null);

    useEffect(() => {
        fetchUserData(window.location.pathname.split('/').pop())
            .then(setUser)
            .catch(() => setUser(null));
    }, []);

    if (!user) return <div>Загрузка...</div>;

    return(
        <div className="profile-card">
            <div className="profile-picture-container user-page-profile-picture-container">
                <img src={userPhotoPlaceholder} id="user-page-picture"
                     alt="плейсхолдер аватарки пользователя"/>
            </div>
            <div className="profile-name">
                {user.username}
            </div>
        </div>
    )
}