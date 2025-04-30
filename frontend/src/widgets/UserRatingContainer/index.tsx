import "./userRatingContainer.css";
import {Link} from "react-router";

import likeButtonImg from "../../shared/assets/like.svg";
import likeClickedImg from "../../shared/assets/like(clicked).svg";
import userPhotoPlaceholder from "../../shared/assets/user-photo.svg";
import {useEffect, useState} from "react";
import {fetchAuthUserData} from "../../processes/fetchAuthUserData.ts";
import {User} from "../../entities/User.ts";
import {saveReleaseByUser} from "../../processes/saveReleaseByUser.ts";
import {checkSavedReleaseByUser} from "../../processes/checkSavedReleaseByUser.ts";
import {deleteSavedReleaseByUser} from "../../processes/deleteSavedReleaseByUser.ts";
import React from "react";
import {saveUserRating} from "../../processes/saveUserRating.ts";
import {deleteUserRating} from "../../processes/deleteUserRating.ts";
import {fetchUserRating} from "../../processes/fetchUserRating.ts";

interface UserRatingContainerProps {
    releaseId: string;
}

export const UserRatingContainer = ({releaseId}: UserRatingContainerProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const [rating, setRating] = useState<number | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const fetchedUser = await fetchAuthUserData();
                fetchedUser.userPhoto = fetchedUser.userPhoto || userPhotoPlaceholder;
                const loggedUser: User = fetchedUser as User;
                setUser(loggedUser);

                if (loggedUser.userId && releaseId) {
                    setIsSaved(await checkSavedReleaseByUser(loggedUser.userId, releaseId));

                    const userRating = await fetchUserRating(loggedUser.userId, releaseId);
                    if (userRating) setRating(userRating);
                }
            } catch {
                setUser(null);
            }
        };
        loadUser();
    }, [releaseId]);

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedRating = parseInt(e.target.value);
        setRating(selectedRating);

        if (user) {
            saveUserRating(user.userId, releaseId, selectedRating);
        }
    };

    const handleCancelRating = () => {
        setRating(null);
        if (user) {
            deleteUserRating(user.userId, releaseId);
        }
    };

    const handleClickSaveReleaseButton = () => {
        const likeButton = document.getElementById("user-like") as HTMLImageElement;
        const button = document.getElementById("like-button") as HTMLButtonElement;
        if (likeButton && button) {
            if (likeButton.src.includes("like.svg")) {
                likeButton.src = likeClickedImg;
                button.setAttribute("value", "1");
                if(user) {
                    saveReleaseByUser(user.userId, releaseId);
                }
            } else {
                likeButton.src = likeButtonImg;
                button.setAttribute("value", "0");
                if (user) {
                    deleteSavedReleaseByUser(user.userId, releaseId);
                }
            }
        }
    };

    return(
        <div className="user-rating-main-container">
            {user && (
                <div id="user-rating-container">
                    <div id="user-info-top">
                        <div id="user-info">
                            <div className="profile-picture-container user-rating-profile-picture-container">
                                <img src={user.userPhoto} className="photo-user-placeholder"
                                     alt="плейсхолдер аватарки пользователя"/>
                            </div>
                            <div id="user-info-text">
                                <Link to={`/user/${encodeURIComponent(user.userId)}`} id="nickname">
                                    {user?.username}
                                </Link>
                                <div className="rating-container">
                                    <div className="rating">
                                        {[5, 4, 3, 2, 1].map((value) => (
                                            <React.Fragment key={value}>
                                                <input
                                                    type="radio"
                                                    name="user-rating"
                                                    value={value}
                                                    id={`rating-${value}`}
                                                    checked={rating === value}
                                                    onChange={handleRatingChange}
                                                />
                                                <label htmlFor={`rating-${value}`}>{value}</label>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        className="cancel-rating-button"
                                        onClick={handleCancelRating}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            {isSaved && (
                                <button id="like-button" value='1'>
                                    <img src={likeClickedImg} id="user-like" alt="Лайк"
                                         onClick={handleClickSaveReleaseButton}/>
                                </button>
                            )}
                            {!isSaved && (
                                <button id="like-button" value='0'>
                                    <img src={likeButtonImg} id="user-like" alt="Лайк"
                                         onClick={handleClickSaveReleaseButton}/>
                                </button>
                            )}
                        </div>
                    </div>
                    <form id="user-album-review-form">
                        <input id="add-review-input" type="text" placeholder="Добавить рецензию"/>
                        <button id="save-user-changes-button" type="submit">сохранить</button>
                    </form>
                </div>
            )}
        </div>
    )
}