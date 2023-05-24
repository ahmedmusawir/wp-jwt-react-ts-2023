import React, { createContext, useReducer, useEffect } from "react";
import { User } from "../constants";

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
    case "AUTH_IS_READY":
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
      };

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

  useEffect(() => {
    // Getting user object from Session Storage
    const jwtUser = sessionStorage.getItem("wpJWTUser");

    if (jwtUser) {
      // JSON.parse(storedToken);
      const user: User = JSON.parse(jwtUser);
      console.log("JWT User from Storage:", user);

      if (user.token) {
        dispatch({ type: "AUTH_IS_READY", payload: user });
      } else {
        dispatch({ type: "AUTH_IS_READY", payload: null });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
