import {axiosInstance} from "../app/axiosInstance.ts";

export async function fetchUserReview(releaseId: string): Promise<string | null> {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/Review/get`, {releaseId}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return response.data.reviewText || null;
    } catch (error) {
        console.error("Ошибка при выполнении fetchUserReview:", error);
        return null;
    }
}