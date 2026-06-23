import { authHeader } from "./AuthService";

const API_URL =
    "http://localhost:5000/api/courses";

export const getCourses =
    async () => {
        const response =
            await fetch(API_URL, {
                headers: authHeader(),
            });

        return response.json();
    };

export const getCoursesStats = 
    async () => {
        const response = await fetch(`${API_URL}/stats`,{
            headers: authHeader(),
        }
        );

        return response.json();
    }