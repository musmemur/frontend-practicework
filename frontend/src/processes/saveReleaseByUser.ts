import {axiosInstance} from "../app/axiosInstance.ts";

type SaveReleaseByUserResponse = {
    savedReleaseId: string
}

export async function saveReleaseByUser(releaseId: string): Promise<SaveReleaseByUserResponse> {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/SavedRelease/save`, {releaseId}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return {
            savedReleaseId: response.data.savedReleaseId,
        };

    } catch (error) {
        console.error('Ошибка при выполнении saveReleaseByUser:', error);
        throw error;
    }
}