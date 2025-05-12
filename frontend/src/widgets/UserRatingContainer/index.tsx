import "./index.scss";
import {Link} from "react-router";

import likeButtonImg from "../../shared/assets/like.svg";
import likeClickedImg from "../../shared/assets/like(clicked).svg";
import userPhotoPlaceholder from "../../shared/assets/user-photo.svg";
import {useEffect, useState, useRef} from "react";
import {fetchAuthUserData} from "../../processes/fetchAuthUserData.ts";
import {User} from "../../entities/User.ts";
import {saveReleaseByUser} from "../../processes/saveReleaseByUser.ts";
import {deleteSavedReleaseByUser} from "../../processes/deleteSavedReleaseByUser.ts";
import React from "react";
import {saveUserRating} from "../../processes/saveUserRating.ts";
import {deleteUserRating} from "../../processes/deleteUserRating.ts";
import {saveReview} from "../../processes/saveReview.ts";
import {deleteReview} from "../../processes/deleteReview.ts";
import {fetchUserReleaseInteraction} from "../../processes/fetchUserReleaseInteraction.ts";

interface UserRatingContainerProps {
    releaseId: string;
}

export const UserRatingContainer = ({releaseId}: UserRatingContainerProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const [rating, setRating] = useState<number | null>(null);
    const [review, setReview] = useState<string>("");
    const likeButtonRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const fetchedUser = await fetchAuthUserData();
                fetchedUser.userPhoto = fetchedUser.userPhoto || userPhotoPlaceholder;
                const loggedUser: User = fetchedUser as User;
                setUser(loggedUser);

                if (loggedUser.userId && releaseId) {
                    const { isSaved, userRating, userReview } = await fetchUserReleaseInteraction(loggedUser.userId, releaseId);
                    setIsSaved(isSaved);
                    if (userRating) setRating(userRating);
                    if(userReview) setReview(userReview);
                }
            } catch {
                setUser(null);
            }
        };

        (async () => {
            await loadUser();
        })();
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
        if (likeButtonRef.current) {
            if (likeButtonRef.current.src.includes("like.svg")) {
                likeButtonRef.current.src = likeClickedImg;
                if (user) {
                    saveReleaseByUser(user.userId, releaseId);
                }
            } else {
                likeButtonRef.current.src = likeButtonImg;
                if (user) {
                    deleteSavedReleaseByUser(user.userId, releaseId);
                }
            }
        }
    };

    const handleClickSaveReviewButton = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(review && user) {
            saveReview(user.userId, releaseId, review);
        }
    }

    const handleClickDeleteReview = () => {
        setReview("");
        if (user) {
            deleteReview(user.userId, releaseId);
        }
    };

    return(
        <>
            {user && (
                <div className="user-rating-container">
                    <div className="user-info-top">
                        <div className="user-info">
                            <div className="profile-picture-container user-rating-profile-picture-container">
                                <img src={user.userPhoto} className="photo-user-placeholder"
                                     alt="аватарка пользователя"/>
                            </div>
                            <div>
                                <Link to={`/user/${encodeURIComponent(user.userId)}`} className="nickname">
                                    {user?.username}
                                </Link>
                                <div className="rating-container">
                                    <div className="release-rating">
                                        {[5, 4, 3, 2, 1].map((value) => (
                                            <React.Fragment key={value}>
                                                <label>
                                                    {value}
                                                    <input
                                                        type="radio"
                                                        name="user-rating"
                                                        value={value}
                                                        id={`rating-${value}`}
                                                        checked={rating === value}
                                                        onChange={handleRatingChange}
                                                    />
                                                </label>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    {rating && (
                                        <button type="button" className="cancel-rating-button"
                                                onClick={handleCancelRating}>X</button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <button id="like-button">
                                <img src={isSaved ? likeClickedImg : likeButtonImg} id="user-like" ref={likeButtonRef} alt="Лайк"
                                     onClick={handleClickSaveReleaseButton}/>
                            </button>
                        </div>
                    </div>
                    <form className="user-release-review-form" onSubmit={handleClickSaveReviewButton}>
                            <textarea id="add-review-input"
                                      placeholder="Добавить рецензию"
                                      value={review}
                                      onChange={(e) => setReview(e.target.value)}
                            />
                        <div className="review-buttons-container">
                            {review && (
                                <button className="delete-review-button" onClick={handleClickDeleteReview}>удалить рецензию</button>
                            )}
                            <button className="save-user-changes-button" type="submit">сохранить</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}