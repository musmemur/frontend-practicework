import {UserReview} from "../UserReview";
import "./userReviews.css";
import {ReviewModal} from "../../pages/AlbumPage/AlbumPage.tsx";

export const UserReviews = ( {reviews}: {reviews: ReviewModal[] | [] }) => {
    return(
        <div id="user-reviews-container">
            <div>
                <strong>Пользовательские рецензии</strong>
            </div>
            <ul id="album-reviews-list">
                <li> <UserReview/> </li>
                <li> <UserReview/> </li>
            </ul>
            <button className="show-more-button search-page">больше</button>
        </div>
    )
}