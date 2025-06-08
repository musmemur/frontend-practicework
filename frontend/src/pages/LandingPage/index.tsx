import Header from "../../widgets/Header";
import styles from "./index.module.scss";
import {Link} from "react-router";
import logo from '../../shared/assets/logo.svg';

export const LandingPage = () => {

    return(
        <>
            <Header/>
            <main className={styles.landingMain}>
                <div className={styles.landingTopic}>
                    <p>ОТКРОЙТЕ<br />ДЛЯ СЕБЯ <strong><br />МИР МУЗЫКИ</strong></p>
                    <img src={logo} className={styles.landingLogo} alt="Логотип"/>
                </div>
                <ul className={styles.landingList}>
                    <li>откройте новые звуки</li>
                    <li>поделитесь своим мнением</li>
                    <li>сохраните любимое</li>
                </ul>
                <Link to="/sign-up" className={styles.signUpButton}>начать</Link>
            </main>
        </>
    )
}