import './userCard.css';

export const UserCard = () => {
    return(
        <div className="profile-card">
            <div className="profile-picture-container user-page-profile-picture-container">
                <img src="src/assets/user-photo.svg" id="user-page-picture"
                     alt="плейсхолдер аватарки пользователя"/>
            </div>
            <div className="profile-name">
                nickname
            </div>
        </div>
    )
}