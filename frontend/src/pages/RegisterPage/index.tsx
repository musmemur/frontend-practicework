import React from "react";
import {UserRegister} from "../../entities/UserRegister.ts";
import {UserPhoto} from "../../entities/UserPhoto.ts";
import {getFileData} from "../../processes/getFileData.ts";
import {axiosInstance} from "../../app/axiosInstance.ts";
import {useNavigate} from "react-router";
import {useFormik} from "formik";

export const RegisterPage = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            photo: null as File | null,
        },
        onSubmit: async (values) => {
            try {
                let userPhoto: UserPhoto | null = null;

                if (values.photo) {
                    userPhoto = {
                        fileName: values.photo.name,
                        data: await getFileData(values.photo),
                    };
                }

                const user: UserRegister = {
                    username: values.username,
                    password: values.password,
                    userPhoto: userPhoto,
                };

                const response = await axiosInstance.post("/User/register", user, {
                    headers: { "Content-Type": "application/json" }
                });

                localStorage.setItem("token", response.data.token);
                navigate(`/user/${response.data.userId}`);
            } catch(error) {
                console.error("Registration error:", error);
            }
        }
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        formik.setFieldValue("photo", file);
    };

    return (
        <div className="modal">
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-content-top">
                    <h2>Зарегистрироваться</h2>
                    <button onClick={() => navigate(-1)}>X</button>
                </div>

                <form className="signUp-form" onSubmit={formik.handleSubmit}>
                    <input
                        name="username"
                        type="text"
                        placeholder="Логин"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        autoComplete="new-username"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        autoComplete="new-password"
                    />
                    <input
                        name="photo"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <button type="submit" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? "Отправка..." : "Зарегистрироваться"}
                    </button>
                </form>
            </div>
        </div>
    );
};