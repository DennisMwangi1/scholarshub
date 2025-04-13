import apiRequest from "./lib/request";

export const getCurrentUser = async () => {
  return await apiRequest("GET", `user/me`);
};
