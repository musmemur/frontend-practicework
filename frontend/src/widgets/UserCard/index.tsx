import './userCard.css';
import {useEffect, useState} from "react";
import {ApiUserResponse} from "../../entities/ApiUserResponse.ts";
import {fetchUserData} from "../../processes/fetchUserData.ts";

import {useParams} from "react-router";
import userPhotoPlaceholder from "../../shared/assets/user-photo.svg";

export const UserCard = () => {
    const [user, setUser] = useState<ApiUserResponse | null>(null);
    const { userId } = useParams<{ userId?: string }>();

    useEffect(() => {
        fetchUserData(userId)
            .then(setUser)
            .catch(() => setUser(null));
    }, [userId]);

    if (!user) return <div>Не найдено</div>;

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