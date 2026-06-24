import { authHeader } from "./AuthService";

const API_URL = "http://localhost:5000/api/courses";

export const getCourses = async () => {
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

export const getCoursesStats = async () => {
    const response = await fetch(`${API_URL}/stats`, {
        headers: authHeader(),
    }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}


// GET /api/courses/:id
export const getCourseById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        headers: authHeader(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

// POST /api/courses
export const createCourse = async (courseData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(),
        },
        body: JSON.stringify(courseData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

// PUT /api/courses/:id
export const updateCourse = async (id, courseData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(),
        },
        body: JSON.stringify(courseData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

// DELETE /api/courses/:id
export const deleteCourse = async (id) => {
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

// POST /api/courses/:id/enroll
export const enrollStudent = async (courseId, studentId) => {
    const response = await fetch(
        `${API_URL}/${courseId}/enroll`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
            body: JSON.stringify({ studentId }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

// DELETE /api/courses/:id/:studentId
export const removeStudent = async (
    courseId,
    studentId
) => {
    const response = await fetch(
        `${API_URL}/${courseId}/${studentId}`,
        {
            method: "DELETE",
            headers: authHeader(),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};