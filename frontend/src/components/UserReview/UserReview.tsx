import './userReview.css';

export const UserReview = () => {
    return (
        <div className="user-review-info">
            <div className="profile-picture-container user-rating-profile-picture-container">
                <img src="src/assets/user-photo.svg" className="photo-user-placeholder"
                     alt="плейсхолдер аватарки пользователя"/>
            </div>
            <div className="user-review-info-text">
                <div className="user-review-info-text-top">
                    <a href="/user" className="user-review-nickname">
                            nickname
                        </a>
                        <div className="user-review-score">
                            ★★★★★
                        </div>
                    </div>
                    <div className="user-review-review">
                        Мне понравился альбом
                    </div>
                </div>
            </div>
            )
            }