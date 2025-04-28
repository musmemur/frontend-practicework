import axios from "axios";
import {ApiUserResponse} from "../app/types/ApiUserResponse.ts";
import {BASE_API_URL} from "../app/BASE_API_URL.ts";

const token = localStorage.getItem("token");

export async function fetchAuthUserData(): Promise<ApiUserResponse> {
    try {
        const response = await axios.get(`${BASE_API_URL}/User/me`, {
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