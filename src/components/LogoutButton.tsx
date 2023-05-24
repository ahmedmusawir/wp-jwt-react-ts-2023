import { useLogout } from "../hooks/useLogout";

const LogoutButton = () => {
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
    // Additional logout logic or redirection can be placed here
  };

  return (
    <button className="btn btn-warning" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
