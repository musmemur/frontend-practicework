import { User } from "../entities/User.ts";
import {axiosInstance} from "../app/axiosInstance.ts";

export async function fetchUserData(userId: string | undefined): Promise<User> {
    try {
        const response = await axiosInstance.get(`/User/get-user-by-id`, {
            params: { userId },
        });

        return {
            userId: response.data.id,
            username: response.data.username,
            userPhoto: response.data.userPhoto,
        };

    } catch (error) {
        console.error("Ошибка при выполнении fetchUserData:", error);
        throw error;
    }
}
