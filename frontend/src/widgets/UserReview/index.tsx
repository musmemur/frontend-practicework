import './userReview.css';
import {Link, useParams} from "react-router";

import userPhotoPlaceholder from "../../shared/assets/user-photo.svg";
import React, {useEffect, useState} from "react";
import {ApiUserResponse} from "../../entities/ApiUserResponse.ts";
import {fetchUserData} from "../../processes/fetchUserData.ts";
import {fetchUserRating} from "../../processes/fetchUserRating.ts";
import {ReviewModal} from "../../entities/ReviewModal.ts";
import {ReleaseRating} from "../../shared/ui/ReleaseRating";

export type UserReviewProps = {
    review: ReviewModal;
}

export const UserReview: React.FC<UserReviewProps> = ({review}) => {
    const { releaseId } = useParams<{ releaseId: string }>();

    const [user, setUser] = useState<ApiUserResponse | null>(null);
    const [ratingReview, setRating] = useState<number | null>(null);

    useEffect(() => {
        fetchUserData(review.userId)
            .then(setUser)
            .catch(() => setUser(null));

        if(releaseId) {
            fetchUserRating(review.userId, releaseId)
                .then(setRating)
                .catch(() => setRating(null));
        }
    }, [review.userId]);

    if (!user) return <div>Не найдено</div>;
    

    return (
        <div className="user-review-info">
            <div className="profile-picture-container user-rating-profile-picture-container">
                <img src={user.userPhoto || userPhotoPlaceholder} className="photo-user-placeholder"
                     alt="плейсхолдер аватарки пользователя"/>
            </div>
            <div className="user-review-info-text">
                <div className="user-review-info-text-top">
                    <Link to="/user" className="user-review-nickname">
                        {user.username}
                    </Link>
                    {ratingReview && (
                        <ReleaseRating rating={ratingReview} />
                    )}
                </div>
                <div className="user-review-review">
                    {review.reviewText}
                </div>
            </div>
        </div>
    )
}