import "../styles/userRatingContainer.css";

export const UserRatingContainer = () => {

    const changeLikeImg = () => {
        const likeButton = document.getElementById("user-like") as HTMLImageElement;
        const button = document.getElementById("like-button") as HTMLButtonElement;
        if (likeButton && button) {
            if (likeButton.src.includes("like.svg")) {
                likeButton.src = "src/assets/like(clicked).svg";
                button.setAttribute("value", "1");
            } else {
                likeButton.src = "src/assets/like.svg";
                button.setAttribute("value", "0");
            }
        }
    };

    return(
        <div id="user-rating-container">
            <div id="user-info-top">
                <div id="user-info">
                    <div className="profile-picture-container user-rating-profile-picture-container">
                        <img src="src/assets/user-photo.svg" className="photo-user-placeholder"
                             alt="плейсхолдер аватарки пользователя"/>
                    </div>
                    <div id="user-info-text">
                        <a href="/user" id="nickname">
                            nickname
                        </a>
                        <div className="rating">
                            <input type="radio" name="any_name" value="5" id="rating-5"/><label
                            htmlFor="rating-5">5</label>
                            <input type="radio" name="any_name" value="4" id="rating-4"/><label
                            htmlFor="rating-4">4</label>
                            <input type="radio" name="any_name" value="3" id="rating-3"/><label
                            htmlFor="rating-3">3</label>
                            <input type="radio" name="any_name" value="2" id="rating-2"/><label
                            htmlFor="rating-2">2</label>
                            <input type="radio" name="any_name" value="1" id="rating-1"/><label
                            htmlFor="rating-1">1</label>
                        </div>
                    </div>
                </div>
                <div>
                    <button id="like-button" value='0'>
                        <img src="src/assets/like.svg" id="user-like" alt="Лайк" onClick={changeLikeImg}/>
                    </button>
                </div>
            </div>
            <form id="user-album-review-form">
                <input id="add-review-input" type="text" placeholder="Добавить рецензию"/>
                <button id="save-user-changes-button" type="submit">сохранить</button>
            </form>
        </div>
    )
}