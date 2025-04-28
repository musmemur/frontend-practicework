import "./userRatingContainer.css";
import {Link} from "react-router";

import likeButtonImg from "../../shared/assets/like.svg";
import likeClickedImg from "../../shared/assets/like(clicked).svg";
import userPhotoPlaceholder from "../../shared/assets/user-photo.svg";
import {useEffect, useState} from "react";
import {fetchAuthUserData} from "../../processes/fetchAuthUserData.ts";
import {User} from "../../entities/User.ts";

export const UserRatingContainer = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const fetchedUser = await fetchAuthUserData();
                fetchedUser.userPhoto = fetchedUser.userPhoto || userPhotoPlaceholder;
                const loggedUser: User = fetchedUser as User;
                setUser(loggedUser);
            } catch {
                setUser(null);
            }
        };
        loadUser();
    }, []);

    const changeLikeImg = () => {
        const likeButton = document.getElementById("user-like") as HTMLImageElement;
        const button = document.getElementById("like-button") as HTMLButtonElement;
        if (likeButton && button) {
            if (likeButton.src.includes("like.svg")) {
                likeButton.src = likeClickedImg;
                button.setAttribute("value", "1");
            } else {
                likeButton.src = likeButtonImg;
                button.setAttribute("value", "0");
            }
        }
    };

    return(
        <div className="user-rating-main-container">
            {user && (
                <div id="user-rating-container">
                    <div id="user-info-top">
                        <div id="user-info">
                            <div className="profile-picture-container user-rating-profile-picture-container">
                                <img src={user.userPhoto} className="photo-user-placeholder"
                                     alt="плейсхолдер аватарки пользователя"/>
                            </div>
                            <div id="user-info-text">
                                <Link to={`/user/${encodeURIComponent(user.userId)}`} id="nickname">
                                    {user?.username}
                                </Link>
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
                                <img src={likeButtonImg} id="user-like" alt="Лайк" onClick={changeLikeImg}/>
                            </button>
                        </div>
                    </div>
                    <form id="user-album-review-form">
                        <input id="add-review-input" type="text" placeholder="Добавить рецензию"/>
                        <button id="save-user-changes-button" type="submit">сохранить</button>
                    </form>
                </div>
            )}
        </div>

    )
}