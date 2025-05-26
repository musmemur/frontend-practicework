import "./index.scss";
import './adaptive.scss';
import {Link} from "react-router";
import likeButtonImg from "../../shared/assets/like.svg";
import likeClickedImg from "../../shared/assets/like(clicked).svg";
import {useEffect, useState, useRef} from "react";
import React from "react";
import {AppDispatch, RootState} from "../../app/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {loadAuthUser} from "../../features/loadAuthUser.ts";
import {
    fetchUserInteraction,
    toggleSaveRelease,
    updateUserRating,
    updateUserReview
} from "../../features/userReleaseInteraction.ts";

interface UserRatingContainerProps {
    releaseId: string;
}

export const UserRatingContainer = ({releaseId}: UserRatingContainerProps) => {
    const [localReview, setLocalReview] = useState<string>("");
    const likeButtonRef = useRef<HTMLImageElement>(null);
    const dispatch: AppDispatch = useDispatch();
    const authUser = useSelector((state: RootState) => state.loadAuthUser.value);
    const interaction = useSelector((state: RootState) =>
        state.userReleaseInteraction.interactions[releaseId]);

    useEffect(() => {
        if (!authUser) {
            dispatch(loadAuthUser());
        }
    }, [authUser, dispatch]);

    useEffect(() => {
        if (authUser?.userId && releaseId) {
            dispatch(fetchUserInteraction(authUser.userId, releaseId));
        }
    }, [authUser?.userId, releaseId, dispatch]);

    useEffect(() => {
        if (interaction?.userReview !== undefined) {
            setLocalReview(interaction.userReview);
        }
    }, [interaction?.userReview]);

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedRating = parseInt(e.target.value);
        if (authUser) {
            dispatch(updateUserRating(authUser.userId, releaseId, selectedRating));
        }
    };

    const handleCancelRating = () => {
        if (authUser) {
            dispatch(updateUserRating(authUser.userId, releaseId, null));
        }
    };

    const handleClickSaveReleaseButton = () => {
        if (authUser && interaction) {
            dispatch(toggleSaveRelease(authUser.userId, releaseId, interaction.isSaved));
        }
    };

    const handleClickSaveReviewButton = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (authUser) {
            dispatch(updateUserReview(authUser.userId, releaseId, localReview));
        }
    };

    const handleClickDeleteReview = () => {
        if (authUser) {
            dispatch(updateUserReview(authUser.userId, releaseId, ''));
        }
    };

    return(
        <>
            {authUser && (
                <div className="user-rating-container">
                    <div className="user-info-top">
                        <div className="user-info">
                            <div className="profile-picture-container user-rating-profile-picture-container">
                                <img src={authUser.userPhoto} className="photo-user-placeholder"
                                     alt="аватарка пользователя"/>
                            </div>
                            <div>
                                <Link to={`/user/${encodeURIComponent(authUser.userId)}`} className="nickname">
                                    {authUser?.username}
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
                                                        checked={interaction?.userRating === value}
                                                        onChange={handleRatingChange}
                                                    />
                                                </label>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    {interaction?.userRating && (
                                        <button type="button" className="cancel-rating-button"
                                                onClick={handleCancelRating}>X</button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="like-button">
                                <img src={interaction?.isSaved ? likeClickedImg : likeButtonImg} className="user-like" ref={likeButtonRef} alt="Лайк"
                                     onClick={handleClickSaveReleaseButton}/>
                            </button>
                        </div>
                    </div>
                    <form className="user-release-review-form" onSubmit={handleClickSaveReviewButton}>
                            <textarea className="add-review-input"
                                      placeholder="Добавить рецензию"
                                      value={localReview}
                                      onChange={(e) => setLocalReview(e.target.value)}
                            />
                        <div className="review-buttons-container">
                            {localReview && (
                                <button className="delete-review-button" onClick={handleClickDeleteReview}>удалить</button>
                            )}
                            <button className="save-user-changes-button" type="submit">сохранить</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}