import { jwtDecode } from "jwt-decode";
const API_URL = "http://localhost:5000/api/auth";

export const login = async (email, password) => {
  const response = await fetch(
    `${API_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return response.json();
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};



export const authHeader = () => ({
  Authorization:
    `Bearer ${localStorage.getItem(
      "token"
    )}`,
});

export const updatePassword = async (id, currentPassword, newPassword) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const user = () => {
  const token = getToken();

  if (!token) {
    return null;
  }

  const decoded = jwtDecode(token);

  return {
    ...decoded,
    userId: decoded.userId || decoded._id,
  };
}