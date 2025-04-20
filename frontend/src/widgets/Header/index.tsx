import "./header.css";
import {Link} from "react-router";

export const Header = () =>{
    return (
        <header>
            <nav id="header-nav">
                <Link to="/" id="logo">
                    <img src="src/assets/logo.svg" id="header-logo" alt="Логотип"/>
                    <span>SOUNDTRACKER</span>
                </Link>
                <form id="search-form">
                    <input type="search" name="search" id="search-input" placeholder="поиск"/>
                    <input type="submit" value=" " id="submit-input" className="button"/>
                </form>
                <Link to="/sign-up" id="enter-button">войти</Link>
            </nav>
        </header>
    );
}