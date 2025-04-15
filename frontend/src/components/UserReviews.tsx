import {UserReview} from "./UserReview.tsx";
import "../styles/userReviews.css";

export const UserReviews = () => {
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