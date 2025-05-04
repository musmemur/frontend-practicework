import {User} from "../entities/User.ts";
import {axiosInstance} from "../app/axiosInstance.ts";

const token = localStorage.getItem("token");

export async function fetchAuthUserData(): Promise<User> {
    try {
        const response = await axiosInstance.get(`/User/me`, {
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