import React, {FC, useState} from "react";
import {UserLogin} from "../../entities/UserLogin.ts";
import {useNavigate} from "react-router";
import {axiosInstance} from "../../app/axiosInstance.ts";
import axios from "axios";

export const LoginPage: FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: UserLogin = {
            username: login,
            password: password
        };
        try {
            const response = await axiosInstance.post("/User/login", user, {
                headers: { "Content-Type": "application/json" }
            });
            localStorage.setItem("token", response.data.token);
            navigate(`/user/${response.data.userId}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data || "Произошла неизвестная ошибка";
                setError(errorMessage);
            } else {
                console.error("Неожиданная ошибка:", error);
            }
        }
    };

    return(
        <div>
            <div className="modal" id="login-modal">
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-content-top">
                        <h2>Войти</h2>
                        <button onClick={() => navigate(-1)}>X</button>
                    </div>
                    <form className="signUp-form" onSubmit={handleLoginSubmit}>
                        <input
                            name="login-input"
                            type="text"
                            placeholder="Логин"
                            value={login}
                            autoComplete="username"
                            onChange={e => setLogin(e.target.value)}
                        />
                        <input
                            name="password-input"
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        {error && (
                            <span className="signUp-error">{error}</span>
                        )}
                        <button type="submit">Войти</button>
                    </form>
                </div>
            </div>
        </div>
    )
}