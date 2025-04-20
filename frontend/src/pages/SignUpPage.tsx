import '../app/styles/signUpPage.css';
import {FC} from "react";
import {useNavigate} from "react-router";

export const SignUpPage: FC = () => {

    const navigate = useNavigate();

    return (
        <div id="sign-up-page">
            <main id="sign-up-main-container">
                <button onClick={ () => navigate("./login") }><span>ВОЙТИ</span></button>
                <button onClick={ () => navigate("./register") }><span>ЗАРЕГИСТРИРОВАТЬСЯ</span></button>
            </main>
        </div>
    );
};
