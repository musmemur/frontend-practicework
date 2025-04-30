import {axiosInstance} from "../app/axiosInstance.ts";

export async function deleteUserRating(userId: string, releaseId: string): Promise<string> {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/ReleaseRating/delete`, {userId, releaseId}, {
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