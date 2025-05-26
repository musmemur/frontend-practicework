import "./index.scss";
import './adaptive.scss';
import {Link, useNavigate} from "react-router";
import {useEffect} from 'react';
import logo from '../../shared/assets/logo.svg';
import {ShowSearchFormButton} from "../../shared/ui/ShowSearchFormButton";
import {useDispatch, useSelector} from "react-redux";
import {loadAuthUser} from "../../features/loadAuthUser.ts";
import {AppDispatch, RootState} from "../../app/store.ts";

const Header = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const authUser = useSelector((state: RootState) => state.loadAuthUser.value);

    useEffect(() => {
        if (!authUser) {
            dispatch(loadAuthUser());
        }
    }, [authUser, dispatch]);

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
