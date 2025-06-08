import styles from './index.module.scss';
import {FC} from "react";
import {useNavigate} from "react-router";

export const SignUpPage: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.signUpPage}>
            <div className={styles.signUpPageContainer}>
                <button onClick={() => navigate(-1)}>X</button>
                <main className={styles.signUpMainContainer}>
                    <button onClick={() => navigate("./login")}><span>ВОЙТИ</span></button>
                    <button onClick={() => navigate("./register")}><span>ЗАРЕГИСТРИРОВАТЬСЯ</span></button>
                </main>
            </div>
        </div>
    );
};
