import axios from "axios";
import {AuthUserResponse} from "../widgets/Header";

const token = localStorage.getItem("token");

export async function fetchAuthUserData(): Promise<AuthUserResponse> {
    try {
        const response = await axios.get("http://localhost:1792/User/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            userId: response.data.userId,
            username: response.data.username,
            userPhoto: response.data.userPhoto,
        };
    } catch (error) {
        console.error('Ошибка при выполнении fetchUserData:', error);
        throw error;
    }
}