import styles from './index.module.scss';
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
        <div className={styles.profileCard}>
            <div className={`${styles.profilePictureContainer} ${styles.userPageProfilePictureContainer}`}>
                <img src={user.userPhoto || userPhotoPlaceholder} className={styles.userPagePicture}
                     alt="плейсхолдер аватарки пользователя"
                />
            </div>
            <div className={styles.profileName}>
                {user.username}
                {authUser?.userId === user.userId && (
                    <LogOutButton />
                )}
            </div>
        </div>
    )
}

export default UserCard;