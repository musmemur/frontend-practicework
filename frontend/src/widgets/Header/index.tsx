import "./header.css";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from 'react';
import {fetchAuthUserData} from "../../processes/fetchAuthUserData.ts";
import {User} from "../../app/types/User.ts";

import userPhotoPlaceholder from "../../shared/assets/user-photo.svg";
import logo from '../../shared/assets/logo.svg';

export const Header = () => {

    const navigate = useNavigate();
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

                {user ? (
                    <Link to={`/user/${encodeURIComponent(user.userId)}`} id="user-header-info">
                        <img
                            src={user.userPhoto}
                            alt={`${user.username} avatar`}
                            style={{

                            }}
                        />
                        <span>{user.username}</span>
                    </Link>
                ) : (
                    <Link to="/sign-up" id="enter-button">
                        войти
                    </Link>
                )}
            </nav>
        </header>
    );
};
