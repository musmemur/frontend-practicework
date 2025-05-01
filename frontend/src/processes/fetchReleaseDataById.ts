import {axiosInstance} from "../app/axiosInstance.ts";
import {ApiFullReleaseResponse} from "../entities/ApiFullReleaseResponse.ts";

export async function fetchReleaseDataById(releaseId: string | undefined): Promise<ApiFullReleaseResponse> {
    try {
        const response = await axiosInstance.get(`/Release/get-release-by-id/${releaseId}`);

        return {
            title: response.data.title,
            artist: response.data.artist,
            releasePhoto: response.data.releasePhoto,
            ratings: response.data.ratings,
            reviews: response.data.reviews,
        };

    } catch (error) {
        console.error("Ошибка при выполнении fetchReleaseDataById:", error);
        throw error;
    }
}