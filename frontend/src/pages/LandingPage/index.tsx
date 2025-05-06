import {Header} from "../../widgets/Header";
import "./index.scss";
import {Link} from "react-router";

import logo from '../../shared/assets/logo.svg';

export const LandingPage = () => {
    return(
        <div>
            <Header/>
            <main className="landing-main">
                <div className="landing-topic">
                    <p>ОТКРОЙТЕ<br />ДЛЯ СЕБЯ <strong><br />МИР МУЗЫКИ</strong></p>
                    <img src={logo} className="landing-logo" alt="Логотип"/>
                </div>
                <ul className="landing-list">
                    <li>откройте новые звуки</li>
                    <li>поделитесь своим мнением</li>
                    <li>сохраните любимое</li>
                </ul>
                <Link to="/sign-up" className="signUp-button">зарегистрироваться</Link>
            </main>
        </div>
    )
}