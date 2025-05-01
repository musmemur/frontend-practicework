import {axiosInstance} from "../app/axiosInstance.ts";

export async function fetchUserReview(userId: string, releaseId: string): Promise<string | null> {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/Review/get`, {
            userId,
            releaseId
        }, {
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