import { useState } from "react";
import { wp } from "../services/apiClient";
import { User } from "../constants";
import { useAuthContext } from "../hooks/useAuthContext";

// JWT AUTH LOGIN FUNCTION IS BEING CREATED USING WP REST API ROOT ROUTE
wp.login = wp.registerRoute("jwt-auth/v1", "/token");

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (username: string, password: string): Promise<User> => {
    let user: User = {
      token: "",
      user_email: "",
      user_nicename: "",
      user_display_name: "",
    };

    setIsLoading(true);

    try {
      user = await wp
        .login()
        .create(`username=${username}&password=${password}`, (res: User) => {});
      // console.log("TOKEN: ", user.token);
      if (user.token) {
        dispatch({ type: "LOGIN", payload: user });
      }

      sessionStorage.setItem("wpJWTUser", JSON.stringify(user));
    } catch (e) {
      setError("Username or Password maybe incorrect!");
    } finally {
      setIsLoading(false);
    }
    // catch (e: unknown) {
    //   // print error
    //   if (e instanceof Error) {
    //     console.log(e);
    //     setError(e.message);
    //   } else {
    //     console.log(e);
    //     setError(String(e));
    //   }

    console.log("User:", user);
    return user;
  };

  return { login, error, setError, isLoading };
};
