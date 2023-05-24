import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
// import { loginToWP } from "../services/authService";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useAuthContext();

  const login = async (username: string, password: string): Promise<void> => {
    try {
      console.log("useLogin: received username", username);
      console.log("useLogin: received password", password);

      // const user = await loginToWP(username, password);
      console.log("userLogin: received user obj from loginToWp", user);

      dispatch({ type: "LOGIN", payload: user });
    } catch (e: unknown) {
      // print error
      if (e instanceof Error) {
        console.log(e);
        setError(e.message);
      } else {
        console.log(e);
        setError(String(e));
      }
    }
  };

  return { login, error };
};
