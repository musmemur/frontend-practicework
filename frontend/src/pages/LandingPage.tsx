import {Header} from "../components/Header.tsx";
import "../styles/landingPage.css";

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
                <a href="/sign-up" id="signUp-button">зарегистрироваться</a>
            </main>
        </div>
    )
}