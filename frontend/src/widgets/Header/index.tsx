import "./index.scss";
import './adaptive.scss';
import {Link} from "react-router";
import {useEffect, useState} from 'react';
import logo from '../../shared/assets/logo.svg';
import {ShowSearchFormButton} from "../../shared/ui/ShowSearchFormButton";
import {useDispatch, useSelector} from "react-redux";
import {loadAuthUser} from "../../features/loadAuthUser.ts";
import {AppDispatch, RootState} from "../../app/store.ts";
import {SearchForm} from "../SearchForm";

const Header = () => {
    const dispatch: AppDispatch = useDispatch();
    const [showSearchForm, setShowSearchForm] = useState(false);
    const authUser = useSelector((state: RootState) => state.loadAuthUser.value);

    useEffect(() => {
        if (!authUser) {
            dispatch(loadAuthUser());
        }
    }, [authUser, dispatch]);

    const toggleSearchForm = () => {
        setShowSearchForm(!showSearchForm);
    };

    return (
        <header>
            <nav className="header-nav">
                <Link to="/" className={`logo ${showSearchForm ? 'active' : ''}`}>
                    <img src={logo} className="header-logo" alt="Логотип"/>
                    <span>SOUNDTRACKER</span>
                </Link>

                <div className={`search-form-container ${showSearchForm ? 'active' : ''}`}>
                    <SearchForm/>
                </div>

                {authUser ? (
                    <div className={`auth-user-container ${showSearchForm ? 'active' : ''}`}>
                        <Link to={`/user/${encodeURIComponent(authUser.userId)}`} className={`user-header-info ${showSearchForm ? 'active' : ''}`}>
                            <img src={authUser.userPhoto} alt={`${authUser.username} avatar`}/>
                            <span>{authUser.username}</span>
                        </Link>
                        <ShowSearchFormButton
                            isActive={showSearchForm}
                            onClick={toggleSearchForm}
                        />
                    </div>
                ) : (<Link to="/sign-up" className="enter-button">войти</Link>)}
            </nav>
        </header>
    );
};

export default Header;
