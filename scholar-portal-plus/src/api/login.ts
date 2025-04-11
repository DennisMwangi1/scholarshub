import apiRequest from "./lib/request";

/**
 * Logs a user into the application.
 *
 * @param email - The email address of the user.
 * @param password - The password of the user.
 * @param role - The role of the user, either 'student' or 'lecturer'.
 * @returns A promise that resolves when the login request is complete.
 */

export const login = async (email: string, password: string, role: string) => {
  await apiRequest("POST", `auth/${role}/login`, { email, password });
};
