import {axiosInstance} from "../app/axiosInstance.ts";

export async function deleteUserRating(releaseId: string): Promise<string> {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/ReleaseRating/delete`, {releaseId}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        console.error('Ошибка при выполнении deleteUserRating:', error);
        throw error;
    }
}