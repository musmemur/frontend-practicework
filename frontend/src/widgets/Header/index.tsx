import "./index.scss";
import './adaptive.scss';
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from 'react';
import {fetchAuthUserData} from "../../processes/fetchAuthUserData.ts";
import {User} from "../../entities/User.ts";
import userPhotoPlaceholder from "../../shared/assets/user-photo.svg";
import logo from '../../shared/assets/logo.svg';
import {ShowSearchFormButton} from "../../shared/ui/ShowSearchFormButton";

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
            <nav className="header-nav">
                <Link to="/" className="logo">
                    <img src={logo} className="header-logo" alt="Логотип"/>
                    <span>SOUNDTRACKER</span>
                </Link>

                <form className='search-form' onSubmit={(e) => {
                    e.preventDefault();
                    const searchValue = e.currentTarget.search.value;
                    navigate(`/search?search=${encodeURIComponent(searchValue)}`);
                }}>
                    <input
                        type="search"
                        name="search"
                        className="search-input"
                        placeholder="поиск"
                    />
                    <input
                        type="submit"
                        value=""
                        className="submit-input"
                    />
                </form>

                {authUser ? (
                    <div className="auth-user-container">
                        <Link to={`/user/${encodeURIComponent(authUser.userId)}`} className="user-header-info">
                            <img src={authUser.userPhoto} alt={`${authUser.username} avatar`}/>
                            <span>{authUser.username}</span>
                        </Link>
                        <ShowSearchFormButton/>
                    </div>
                ) : (<Link to="/sign-up" className="enter-button">войти</Link>)}
            </nav>
        </header>
    );
};

export default Header;
