import {axiosInstance} from "../app/axiosInstance.ts";

export async function checkSavedReleaseByUser(releaseId: string): Promise<boolean> {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/SavedRelease/check-saved-release-by-user`, {releaseId}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        console.error('Ошибка при выполнении checkSavedReleaseByUser:', error);
        throw error;
    }
}