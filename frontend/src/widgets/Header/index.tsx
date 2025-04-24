import "./header.css";
import {Link} from "react-router";
import {useEffect, useState} from 'react';
import {fetchAuthUserData} from "../../processes/fetchAuthUserData.ts";
import {User} from "../../app/types/User.ts";

import userPhotoPlaceholder from "../../shared/assets/user-photo.svg";
import logo from '../../shared/assets/logo.svg';

export const Header = () => {
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
                    <input type="submit" value=" " id="submit-input" className="button" />
                </form>

                {user ? (
                    <div id="user-header-info">
                        <img
                            src={user.userPhoto}
                            alt={`${user.username} avatar`}
                            style={{

                            }}
                        />
                        <span>{user.username}</span>
                    </div>
                ) : (
                    <Link to="/sign-up" id="enter-button">
                        войти
                    </Link>
                )}
            </nav>
        </header>
    );
};
