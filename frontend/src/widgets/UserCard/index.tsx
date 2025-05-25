import './index.scss';
import './adaptive.scss';
import React, {useEffect, useState} from "react";
import userPhotoPlaceholder from "../../shared/assets/user-photo.svg";
import {ApiFullUserResponse} from "../../entities/ApiFullUserResponse.ts";
import {fetchAuthUserData} from "../../processes/fetchAuthUserData.ts";
import {User} from "../../entities/User.ts";
import {LogOutButton} from "../../shared/ui/LogOutButton";

type UserCardProps = {
    user: ApiFullUserResponse;
}

const UserCard: React.FC<UserCardProps> = ({user}) => {
    const [authUser, setAuthUser] = useState<User | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const fetchedUser = await fetchAuthUserData();
                fetchedUser.userPhoto = fetchedUser.userPhoto || userPhotoPlaceholder;
                const loggedUser: User = fetchedUser as User;
                setAuthUser(loggedUser);
            } catch {
                setAuthUser(null);
            }
        };

        (async () => {
            await loadUser();
        })();
    }, []);

    return(
        <div className="profile-card">
            <div className="profile-picture-container user-page-profile-picture-container">
                <img src={user.userPhoto || userPhotoPlaceholder} className="user-page-picture"
                     alt="плейсхолдер аватарки пользователя"/>
            </div>
            <div className="profile-name">
                {user.username}
                {authUser?.userId === user.userId && (
                    <LogOutButton />
                )}
            </div>
        </div>
    )
}

export default UserCard;