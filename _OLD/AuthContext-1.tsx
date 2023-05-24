import React, { createContext, useReducer, useEffect } from "react";
import { User } from "../services/authService";

// Define the type for the authentication state
interface AuthState {
  user: User | null;
  authIsReady: boolean;
}

// Define the action types for the reducer
type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "AUTH_IS_READY"; payload: User | null };

// Define the initial state for the authentication context
const initialState: AuthState = {
  user: null,
  authIsReady: false,
};

// Create the AuthContext
export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Define the auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      console.log(
        "AuthContext: LOGIN dispatch received - Current STATE:",
        state
      );
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        authIsReady: false,
      };
    // case "AUTH_IS_READY":
    //   return {
    //     ...state,
    //     user: action.payload,
    //     authIsReady: true,
    //   };
    default:
      return state;
  }
};

// AuthContextProvider component
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // useEffect(() => {
  //   const storedToken = {
  //     token:
  //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vd3Atand0LXdpbi5sb2NhbCIsImlhdCI6MTY4NDgxNDQ4MywibmJmIjoxNjg0ODE0NDgzLCJleHAiOjE2ODU0MTkyODMsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.xswS1akl7qIo96PfME9Mp0hUrlMTTESfL9wgHX7y6S8",
  //     user_email: "dev-email@wpengine.local",
  //     user_nicename: "cgteam",
  //     user_display_name: "cgteam",
  //   };

  //   if (storedToken) {
  //     // Parse the token and extract user data
  //     const { user_email, user_nicename, user_display_name } = storedToken;
  //     // JSON.parse(storedToken);

  //     const user: User = {
  //       email: user_email,
  //       nicename: user_nicename,
  //       displayName: user_display_name,
  //     };

  //     dispatch({ type: "AUTH_IS_READY", payload: user });
  //   } else {
  //     dispatch({ type: "AUTH_IS_READY", payload: null });
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
