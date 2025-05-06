import {UserReview} from "../UserReview";
import "./index.scss";
import {ReviewModal} from "../../entities/ReviewModal.ts";

export const UserReviews = ( {reviews}: {reviews: ReviewModal[] | [] }) => {
    return reviews.length > 0 ? (
        <div id="user-reviews-container">
            <div>
                <strong>Пользовательские рецензии</strong>
            </div>
            {reviews.length > 0 && (
                <ul id="album-reviews-list">
                    {reviews.map((review) => (
                        <li key={`review-${review.userId}-${review.reviewText}`}>
                            <UserReview review={review}/>
                        </li>
                    ))}
                </ul>
            )}
            {reviews.length > 3 && (
                <button className="show-more-button search-page">больше</button>
            )}
        </div>
    ) : null;
}