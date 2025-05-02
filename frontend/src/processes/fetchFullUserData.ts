import {axiosInstance} from "../app/axiosInstance.ts";
import {ApiFullUserResponse} from "../entities/ApiFullUserResponse.ts";

export async function fetchFullUserData(userId: string | undefined): Promise<ApiFullUserResponse> {
    try {
        const response = await axiosInstance.get(`/User/get-full-user-info-by-id`, {
            params: { userId },
        });

        return {
            userId: response.data.id,
            username: response.data.username,
            userPhoto: response.data.userPhoto,
            ratings: response.data.ratings,
            savedReleases: response.data.savedReleases
        };

    } catch (error) {
        console.error("Ошибка при выполнении fetchFullUserData:", error);
        throw error;
    }
}