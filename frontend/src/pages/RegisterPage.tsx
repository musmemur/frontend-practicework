import React, {useState} from "react";
import axios from "axios";

type UserRegister = {
    username: string;
    password: string;
    userPhoto: string | null;
}

type UserPhoto = {
    fileName: string;
    data: string;
}

export const RegisterPage = () => {
    const [registerLogin, setRegisterLogin] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            setProfilePicture(null);
            return;
        }
        setProfilePicture(files[0]);
    };

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let userPhoto: UserPhoto | null = null;
        if (profilePicture) {
            userPhoto = {
                fileName: profilePicture.name,
                data: await getFileData(profilePicture),
            };
        }
        const user: UserRegister = {
            username: registerLogin,
            password: registerPassword,
            userPhoto: userPhoto===null ? null : userPhoto.data,
        };

        try {
            const response = await axios.post("http://localhost:1792/User/register", user, {
                headers: { "Content-Type": "application/json" }
            });
            localStorage.setItem("user", JSON.stringify(response));
            window.location.href = `/user`;
        } catch(error) {
            console.error(error);
        }
    };

    async function getFileData(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const result = e.target?.result;
                if (result && typeof result === "string") {
                    const mimeType = file.type;
                    const base64Data = result.split(",")[1];
                    resolve(`data:${mimeType};base64,${base64Data}`);
                } else {
                    reject(new Error("Ошибка чтения файла"));
                }
            };
            reader.onerror = function () {
                reject(new Error("Ошибка чтения файла."));
            };
            reader.readAsDataURL(file);
        });
    }

    return (
        <div className="modal" id="register-modal">
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Зарегистрироваться</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <input
                        type="text"
                        placeholder="Логин"
                        value={registerLogin}
                        onChange={e => setRegisterLogin(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={registerPassword}
                        onChange={e => setRegisterPassword(e.target.value)}
                    />
                    <input
                        type="file"
                        onChange={onFileChange}
                    />
                    <button type="submit">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    )
}