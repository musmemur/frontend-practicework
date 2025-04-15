import "../styles/header.css";

export const Header = () =>{
    return (
        <header>
            <nav>
                <a id="logo" href="/">
                    <img src="src/assets/logo.svg" id="header-logo" alt="Логотип"/>
                    <span>SOUNDTRACKER</span>
                </a>
                <form id="search-form">
                    <input type="search" name="search" id="search-input" placeholder="поиск"/>
                    <input type="submit" value=" " id="submit-input" className="button"/>
                </form>
                <a href="/sign-up" id="enter-button">войти</a>
            </nav>
        </header>
    );
}