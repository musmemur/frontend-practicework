import './index.scss';
import './adaptive.scss';
import React, {useEffect} from "react";
import userPhotoPlaceholder from "../../shared/assets/user-photo.svg";
import {ApiFullUserResponse} from "../../entities/ApiFullUserResponse.ts";
import {LogOutButton} from "../../shared/ui/LogOutButton";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {loadAuthUser} from "../../features/loadAuthUser.ts";

type UserCardProps = {
    user: ApiFullUserResponse;
}

const UserCard: React.FC<UserCardProps> = ({user}) => {
    const dispatch: AppDispatch = useDispatch();
    const authUser = useSelector((state: RootState) => state.loadAuthUser.value);

    useEffect(() => {
        if (!authUser) {
            dispatch(loadAuthUser());
        }
    }, [authUser, dispatch]);

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