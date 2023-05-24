import { useState } from "react";
import { wp } from "../services/apiClient";
import { useAuthContext } from "../hooks/useAuthContext";

export interface User {
  token?: string;
  email?: string;
  nicename?: string;
  displayName?: string;
}
// JWT AUTH LOGIN FUNCTION IS BEING CREATED USING WP REST API ROOT ROUTE
wp.login = wp.registerRoute("jwt-auth/v1", "/token");

const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useAuthContext();

  const login = async (username: string, password: string): Promise<User> => {
    // console.log("authService: username", username);
    // console.log("authService: password", password);

    let user: User = { token: "", email: "", nicename: "", displayName: "" };

    try {
      user = await wp
        .login()
        .create(`username=${username}&password=${password}`, (res: User) => {});
      console.log("TOKEN: ", user.token);
      dispatch({ type: "LOGIN", payload: user });

      // sessionStorage.setItem("wpJWTToken", JSON.stringify(res.token));
    } catch (error) {
      console.log(error);
    }

    console.log("User:", user);
    return user;
  };

  return { login, error };
};
