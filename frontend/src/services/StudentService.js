import { authHeader } from "./AuthService";

const API_URL = "http://localhost:5000/api/students";

export const getStudents = async () => {
    const response =
        await fetch(API_URL, {
            headers: authHeader(),
        });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

export const getStudentsStats = async () => {
    const response = await fetch(`${API_URL}/stats`, {
        headers: authHeader(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

// GET /api/students/:id
export const getStudentById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        headers: authHeader(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

// POST /api/students
export const createStudent = async (studentData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(),
        },
        body: JSON.stringify(studentData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

// PUT /api/students/:id
export const updateStudent = async (id, studentData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(),
        },
        body: JSON.stringify(studentData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

// DELETE /api/students/:id
export const deleteStudent = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: authHeader(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};