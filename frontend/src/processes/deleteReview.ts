import {axiosInstance} from "../app/axiosInstance.ts";

export async function deleteReview(userId: string, releaseId: string): Promise<string> {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/Review/delete`, {userId, releaseId}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        console.error('Ошибка при выполнении deleteReview:', error);
        throw error;
    }
}