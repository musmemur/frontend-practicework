import {axiosInstance} from "../app/axiosInstance.ts";

export async function saveUserRating(releaseId: string, rating: number): Promise<string> {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/ReleaseRating/rate`, {releaseId, rating}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        console.error('Ошибка при выполнении saveUserRating:', error);
        throw error;
    }
}