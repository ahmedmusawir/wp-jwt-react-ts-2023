import { useState } from "react";
import { wp } from "../services/apiClient";
import { User } from "../constants";
import { useAuthContext } from "../hooks/useAuthContext";

// JWT AUTH LOGIN FUNCTION IS BEING CREATED USING WP REST API ROOT ROUTE
wp.login = wp.registerRoute("jwt-auth/v1", "/token");

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useAuthContext();

  const login = async (username: string, password: string): Promise<User> => {
    let user: User = {
      token: "",
      user_email: "",
      user_nicename: "",
      user_display_name: "",
    };

    try {
      user = await wp
        .login()
        .create(`username=${username}&password=${password}`, (res: User) => {});
      console.log("TOKEN: ", user.token);
      if (user.token) {
        dispatch({ type: "LOGIN", payload: user });
      }

      sessionStorage.setItem("wpJWTUser", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }

    console.log("User:", user);
    return user;
  };

  return { login, error };
};
