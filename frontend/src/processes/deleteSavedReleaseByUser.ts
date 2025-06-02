import {axiosInstance} from "../app/axiosInstance.ts";

export async function deleteSavedReleaseByUser(releaseId: string): Promise<string> {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/SavedRelease/delete`, {releaseId}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        console.error('Ошибка при выполнении deleteSavedReleaseByUser:', error);
        throw error;
    }
}