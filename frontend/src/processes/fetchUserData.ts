import axios from "axios";
import { ApiUserResponse } from "../app/types/ApiUserResponse";

export async function fetchUserData(userId: string | undefined): Promise<ApiUserResponse> {
    try {
        const response = await axios.get("http://localhost:1792/User/get-user-by-id", {
            params: { userId },
        });

        return {
            userId: response.data.userId,
            username: response.data.username,
            userPhoto: response.data.userPhoto,
        };

    } catch (error) {
        console.error("Ошибка при выполнении fetchUserData:", error);
        throw error;
    }
}
