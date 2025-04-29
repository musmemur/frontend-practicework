import {axiosInstance} from "../app/axiosInstance.ts";
import {ApiReleaseResponse} from "../entities/ApiReleaseResponse.ts";
import {ApiReleaseRequest} from "../entities/ApiReleaseRequest.ts";

export async function fetchReleaseData(release: ApiReleaseRequest): Promise<ApiReleaseResponse> {
    try {
        const response = await axiosInstance.post(`/Release/get-release`, release, {
            headers: { "Content-Type": "application/json" }
        });

        return {
            releaseId: response.data.id,
            title: response.data.title,
            artist: response.data.artist,
            releasePhoto: response.data.releasePhoto,
        };

    } catch (error) {
        console.error("Ошибка при выполнении fetchReleaseData:", error);
        throw error;
    }
}