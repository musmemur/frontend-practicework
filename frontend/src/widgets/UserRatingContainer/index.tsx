import "./index.scss";
import './adaptive.scss';
import {Link} from "react-router";
import likeButtonImg from "../../shared/assets/like.svg";
import likeClickedImg from "../../shared/assets/like(clicked).svg";
import {useEffect, useState, useRef} from "react";
import {saveReleaseByUser} from "../../processes/saveReleaseByUser.ts";
import {deleteSavedReleaseByUser} from "../../processes/deleteSavedReleaseByUser.ts";
import React from "react";
import {saveUserRating} from "../../processes/saveUserRating.ts";
import {deleteUserRating} from "../../processes/deleteUserRating.ts";
import {saveReview} from "../../processes/saveReview.ts";
import {deleteReview} from "../../processes/deleteReview.ts";
import {fetchUserReleaseInteraction} from "../../processes/fetchUserReleaseInteraction.ts";
import {AppDispatch, RootState} from "../../app/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {loadAuthUser} from "../../features/loadAuthUser.ts";

interface UserRatingContainerProps {
    releaseId: string;
}

export const UserRatingContainer = ({releaseId}: UserRatingContainerProps) => {
    const [isSaved, setIsSaved] = useState(false);
    const [rating, setRating] = useState<number | null>(null);
    const [review, setReview] = useState<string>("");
    const likeButtonRef = useRef<HTMLImageElement>(null);
    
    const dispatch: AppDispatch = useDispatch();
    const authUser = useSelector((state: RootState) => state.loadAuthUser.value);

    useEffect(() => {
        if (!authUser) {
            dispatch(loadAuthUser());
        }
    }, [authUser, dispatch]);

    useEffect(() => {
        if (!authUser?.userId || !releaseId) return;

        const fetchData = async () => {
            const {isSaved, userRating, userReview} = await fetchUserReleaseInteraction(
                authUser.userId,
                releaseId
            );
            setIsSaved(isSaved);
            if (userRating) setRating(userRating);
            if (userReview) setReview(userReview);
        };

        fetchData().catch(console.error);
    }, [authUser?.userId, releaseId]);

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedRating = parseInt(e.target.value);
        setRating(selectedRating);
        if (authUser) {
            saveUserRating(authUser.userId, releaseId, selectedRating);
        }
    };

    const handleCancelRating = () => {
        setRating(null);
        if (authUser) {
            deleteUserRating(authUser.userId, releaseId);
        }
    };

    const handleClickSaveReleaseButton = () => {
        if (likeButtonRef.current) {
            if (likeButtonRef.current.src.includes("like.svg")) {
                likeButtonRef.current.src = likeClickedImg;
                if (authUser) {
                    saveReleaseByUser(authUser.userId, releaseId);
                }
            } else {
                likeButtonRef.current.src = likeButtonImg;
                if (authUser) {
                    deleteSavedReleaseByUser(authUser.userId, releaseId);
                }
            }
        }
    };

    const handleClickSaveReviewButton = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(review && authUser) {
            saveReview(authUser.userId, releaseId, review);
        }
    }

    const handleClickDeleteReview = () => {
        setReview("");
        if (authUser) {
            deleteReview(authUser.userId, releaseId);
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
                            <button className="like-button">
                                <img src={isSaved ? likeClickedImg : likeButtonImg} className="user-like" ref={likeButtonRef} alt="Лайк"
                                     onClick={handleClickSaveReleaseButton}/>
                            </button>
                        </div>
                    </div>
                    <form className="user-release-review-form" onSubmit={handleClickSaveReviewButton}>
                            <textarea className="add-review-input"
                                      placeholder="Добавить рецензию"
                                      value={review}
                                      onChange={(e) => setReview(e.target.value)}
                            />
                        <div className="review-buttons-container">
                            {review && (
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