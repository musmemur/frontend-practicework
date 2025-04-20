import React, {FC, useState} from "react";
import axios from "axios";
import {UserLogin} from "../app/types/UserLogin.ts";

export const LoginPage: FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');


    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: UserLogin = {
            username: login,
            password: password
        };
        try {
            const response = await axios.post("http://localhost:1792/User/login", user, {
                headers: { "Content-Type": "application/json" }
            });
            localStorage.setItem("token", response.data.token);
            window.location.href = `/user/${response.data.userId}`;
        } catch(error) {
            console.error(error);
        }
    };

    return(
        <div>
            <div className="modal" id="login-modal">
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <h2>Войти</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <input
                            type="text"
                            placeholder="Логин"
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button type="submit">Войти</button>
                    </form>
                </div>
            </div>
        </div>
    )
}