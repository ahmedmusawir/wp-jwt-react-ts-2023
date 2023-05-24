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
      console.log(
        "AuthContext: LOGOUT dispatch received - Current STATE:",
        state
      );
      return {
        ...state,
        user: null,
        authIsReady: false,
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

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
