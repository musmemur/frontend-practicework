import "./index.scss";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from 'react';
import {fetchAuthUserData} from "../../processes/fetchAuthUserData.ts";
import {User} from "../../entities/User.ts";
import userPhotoPlaceholder from "../../shared/assets/user-photo.svg";
import logo from '../../shared/assets/logo.svg';

const Header = () => {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState<User | null>(null);
    useEffect(() => {
        const loadUser = async () => {
            try {
                const fetchedUser = await fetchAuthUserData();
                fetchedUser.userPhoto = fetchedUser.userPhoto || userPhotoPlaceholder;
                const loggedUser: User = fetchedUser as User;
                setAuthUser(loggedUser);
            } catch {
                setAuthUser(null);
            }
        };

        (async () => {
            await loadUser();
        })();
    }, []);

    return (
        <header>
            <nav id="header-nav">
                <Link to="/" id="logo">
                    <img src={logo} id="header-logo" alt="Логотип" />
                    <span>SOUNDTRACKER</span>
                </Link>
                <form id="search-form">
                    <input type="search" name="search" id="search-input" placeholder="поиск" />
                    <input type="submit" value="" onClick={() => navigate("/search?search={value}")}
                           id="submit-input" className="button" />
                </form>

                {authUser ? (
                    <Link to={`/user/${encodeURIComponent(authUser.userId)}`} id="user-header-info">
                        <img src={authUser.userPhoto} alt={`${authUser.username} avatar`}/>
                        <span>{authUser.username}</span>
                    </Link>
                ) : ( <Link to="/sign-up" id="enter-button">войти</Link> )}
            </nav>
        </header>
    );
};

export default Header;
