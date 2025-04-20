import {Header} from "../widgets/Header";
import "../app/styles/landingPage.css";
import {Link} from "react-router";

export const LandingPage = () => {
    return(
        <div>
            <Header/>
            <main id="landing-main">
                <div id="landing-topic">
                    <p>ОТКРОЙТЕ<br />ДЛЯ СЕБЯ <strong><br />МИР МУЗЫКИ</strong></p>
                    <img src="src/assets/logo.svg" id="landing-logo" alt="Логотип"/>
                </div>
                <ul id="landing-list">
                    <li>откройте новые звуки</li>
                    <li>поделитесь своим мнением</li>
                    <li>сохраните любимое</li>
                </ul>
                <Link to="/sign-up" id="signUp-button">зарегистрироваться</Link>
            </main>
        </div>
    )
}