import {axiosInstance} from "../app/axiosInstance.ts";

export async function fetchUserRating(userId: string, releaseId: string): Promise<number | null> {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/ReleaseRating/get`, {
            userId,
            releaseId
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return response.data?.rating || null;
    } catch (error) {
        console.error("Ошибка при выполнении fetchUserRating:", error);
        return null;
    }
}