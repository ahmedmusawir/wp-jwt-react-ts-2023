import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuthContext = () => {
  const { state, dispatch } = useContext(AuthContext);

  if (!state || !dispatch) {
    throw Error("useAuthContext must be used within an AuthContextProvider");
  }

  return { state, dispatch };
};
