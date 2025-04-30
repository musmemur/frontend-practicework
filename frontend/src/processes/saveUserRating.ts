import {axiosInstance} from "../app/axiosInstance.ts";

export async function saveUserRating(userId: string, releaseId: string, rating: number): Promise<string> {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/ReleaseRating/rate`, {userId, releaseId, rating}, {
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