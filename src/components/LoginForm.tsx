import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const { login, error } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log(username);
    console.log(password);
    login(username, password);
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
