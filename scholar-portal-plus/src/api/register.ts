import apiRequest from "./lib/request";

export const register = async (
  fullname: string,
  email: string,
  password: string,
  role: string
) => {
  await apiRequest("POST", `auth/${role}/register`, {
    fullname,
    email,
    password,
  });
};
