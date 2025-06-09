import {UserReview} from "../UserReview";
import styles from "./index.module.scss";
import {ReviewModal} from "../../entities/ReviewModal.ts";
import {Notebook} from "../../shared/assets/Notebook.tsx";

export const UserReviews = ( {reviews}: {reviews: ReviewModal[] | [] }) => {
    return reviews.length > 0 ? (
        <div className={styles.userReviewsContainer}>
            <div>
                <strong>Пользовательские рецензии</strong>
            </div>
            {reviews.length > 0 && (
                <ul className={styles.albumReviewsList}>
                    {reviews.map((review) => (
                        <li key={`review-${review.userId}-${review.reviewText}`}>
                            <UserReview review={review}/>
                        </li>
                    ))}
                </ul>
            )}
            {reviews.length > 3 && (
                <button className={`${styles.showMoreButton} ${styles.searchPage}`}>больше</button>
            )}
        </div>
    ) : <div className={styles.noReviewsContainer}>
        <Notebook/>
        Нет ни одной рецензии
    </div>;
}