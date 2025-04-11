import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiRequest = async (method, route, data = null) => {
  try {
    const config = {
      method,
      url: route,
      data: method === "POST" || method === "PUT" ? data : null,
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
