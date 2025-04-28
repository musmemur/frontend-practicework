import axios from "axios";
import { ApiUserResponse } from "../app/types/ApiUserResponse";
import {BASE_API_URL} from "../app/BASE_API_URL.ts";

export async function fetchUserData(userId: string | undefined): Promise<ApiUserResponse> {
    try {
        const response = await axios.get(`${BASE_API_URL}/User/get-user-by-id`, {
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
