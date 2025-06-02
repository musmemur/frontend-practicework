import {axiosInstance} from "../app/axiosInstance.ts";

export async function saveReview(releaseId: string, reviewText: string): Promise<string> {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/Review/create`, {releaseId, reviewText}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        console.error('Ошибка при выполнении saveReview:', error);
        throw error;
    }
}