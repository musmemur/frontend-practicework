import {axiosInstance} from "../app/axiosInstance.ts";
import {UserRegister} from "../entities/UserRegister.ts";
import {AuthResponse} from "../entities/AuthResponse.ts";

export async function registerUser(user: UserRegister): Promise<AuthResponse> {
    try {
        const response = await axiosInstance.post("/User/register", user, {
            headers: { "Content-Type": "application/json" }
        });

        return {
            token: response.data.token,
            userId: response.data.userId,
            username: response.data.username,
            userPhoto: response.data.userPhoto
        };

    } catch (error) {
        console.error("Ошибка при регистрации:", error);
        throw error;
    }
}