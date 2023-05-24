import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import WPAPI from "wpapi";

export interface User {
  token?: string;
  email?: string;
  nicename?: string;
  displayName?: string;
}

const RESTROOT = "http://wp-jwt-win.local/wp-json";
const wp = new WPAPI({ endpoint: RESTROOT });

wp.login = wp.registerRoute("jwt-auth/v1", "/token");

const LoginForm = () => {
  const { login, error } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log(username);
    console.log(password);
    const auth = await wp
      .login()
      .create(`username=${username}&password=${password}`, (res: User) => {
        console.log("AUTH: ", res);
        // sessionStorage.setItem("wpJWTToken", JSON.stringify(res.token));
      });

    console.log("Auth:", auth);
  };

  return (
    <div className="form-control">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-primary my-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-primary my-2"
      />
      <button className="btn" onClick={handleLogin}>
        Login
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;
