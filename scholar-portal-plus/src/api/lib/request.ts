import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiRequest = async (method, route, data = null) => {
  try {
    // Get the JWT token from localStorage (or wherever you store it)
    const token = localStorage.getItem("token");

    // Prepare headers
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const config = {
      method,
      url: route,
      data: method === "POST" || method === "PUT" ? data : null,
      headers, // Include headers in the config
    };

    const response = await axiosInstance(config);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response);
      throw new Error(error.response.data.message || "Something went wrong");
    } else if (error.request) {
      console.error("Error request:", error.request);
      throw new Error("No response from server");
    } else {
      console.error("Error message:", error.message);
      throw new Error(error.message || "Unknown error");
    }
  }
};

export default apiRequest;
